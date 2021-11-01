const uuid = require('uuid').v4;
const AWS = require('aws-sdk');
const debug = require('debug')('app:image');
const fs = require('fs').promises;
const { Client } = require('node-scp');

const v4 = () => uuid().replace(/-/g, '');

const {
  ACCESS_KEY_ID,
  ACCESS_SECRET,
  AWS_REGION,
  BUCKET,
} = process.env;

// Configure AWS to use promise
// AWS.config.setPromisesDependency(require('bluebird'));

AWS.config.update({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: ACCESS_SECRET,
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
        await client.uploadDir(`/tmp/${path}`, `/web/gunsigi_data/images/${path}`);
        client.close();
      } catch (e) {
        debug(e);
        throw Error('Error in save image');
      } finally {
        await fs.rm(`/tmp/${path}`, { recursive: true });
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
};
