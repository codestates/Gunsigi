/* eslint-disable import/no-extraneous-dependencies */
const uuid = require('uuid').v4;
const AWS = require('aws-sdk');
const sharp = require('sharp');
const debug = require('debug')('app:image');
const fs = require('fs').promises;

let Client;
// eslint-disable-next-line global-require
if (process.env.NODE_ENV !== 'production') Client = require('node-scp').Client;

const v4 = () => uuid().replace(/-/g, '');

const { ACCESS_KEY_ID, SECERT_ACCESS_KEY, AWS_REGION, BUCKET } = process.env;

// Configure AWS to use promise
// AWS.config.setPromisesDependency(require('bluebird'));

AWS.config.update({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECERT_ACCESS_KEY,
  region: AWS_REGION,
});
const s3 = new AWS.S3();

module.exports = {
  save: async (path, image) => {
    // CDN서버에 이미지를 저장한다.
    const matches = image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    if (matches.length !== 3) return new Error('Invalid Base64 Image String');

    const base64Data = Buffer.from(matches[2], 'base64');
    const type = matches[1];
    const uid = v4();

    // 개발모드일 경우 테스트서버에 저장
    if (process.env.NODE_ENV !== 'production') {
      const filename = `${uid}.${type.split('/')[1]}`;
      await fs.mkdir(`/tmp/${path}`, { recursive: true });
      await fs.writeFile(`/tmp/${path}/${filename}`, base64Data);
      // SCP로 전송
      try {
        const client = await Client({
          host: process.env.TEST_SSH_HOST,
          port: parseInt(process.env.TEST_SSH_PORT, 10),
          username: process.env.TEST_SSH_USERNAME,
          password: process.env.TEST_SSH_PASSWORD,
        });
        await client.uploadDir(`/tmp/${path}`, `/web/gunsigi_cdn/${path}`);
        client.close();
      } catch (e) {
        debug(e);
        throw Error('Error in save image');
      }
      return `${path}/${filename}`;
    }

    // S3저장
    const params = {
      Bucket: BUCKET,
      Key: `${path}/${uid}`,
      Body: base64Data,
      ContentEncoding: 'base64',
      ContentType: type,
    };

    let key = '';
    try {
      const { Key } = await s3.upload(params).promise();
      key = Key;
    } catch (error) {
      debug('error', error);
    }
    return key;
  },
  delete: async (Key) => {
    if (process.env.NODE_ENV !== 'production') return;
    // CDN서버에 있는 이미지를 삭제한다.
    await s3.deleteObject({ Bucket: BUCKET, Key }).promise();
  },
  deleteFolder: async function deleteObjects(dir) {
    if (process.env.NODE_ENV !== 'production') return;
    // Objects 조회
    const listParams = { Bucket: BUCKET, Prefix: dir };
    const listObjects = await s3.listObjectsV2(listParams).promise();
    if (listObjects.Contents.length === 0) return;

    const params = { Bucket: BUCKET, Delete: { Objects: [] } };

    // 삭제할 목록들
    listObjects.Contents.forEach(({ Key }) => {
      params.Delete.Objects.push({ Key });
    });

    await s3.deleteObjects(params).promise();

    // Object가 남아있으면 재귀호출로 전부 제거
    if (listObjects.IsTruncated) await deleteObjects(dir);
  },
  async compressAndSave(path, image) {
    // 이미지 webp 변환해서 저장
    const matches = image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    if (matches.length !== 3) return new Error('Invalid Base64 Image String');
    const decodedImage = Buffer.from(matches[2], 'base64');
    const compressedImage = (
      await sharp(decodedImage).webp().toBuffer()
    ).toString('base64');
    const result = await this.save(
      path,
      `data:image/webp;base64,${compressedImage}`,
    );
    return result;
  },
  async thumbnailAndSave(path, image) {
    // 이미지 사이즈조절 및 압축
    // 이미지 압축해서 저장
    const matches = image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    if (matches.length !== 3) return new Error('Invalid Base64 Image String');
    if (matches[1].includes('gif')) {
      // GIF는 제외
      const result = await this.save(path, image);
      return result;
    }
    const decodedImage = Buffer.from(matches[2], 'base64');
    const compressedImage = (
      await sharp(decodedImage).resize(150, 150).webp().toBuffer()
    ).toString('base64');
    const result = await this.save(
      path,
      `data:image/webp;base64,${compressedImage}`,
    );
    return result;
  },
};
