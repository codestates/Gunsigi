const uuid = require('uuid').v4;
const AWS = require('aws-sdk');
const debug = require('debug')('app');

const v4 = () => uuid().replace(/-/g, '').slice(0, 15);

const {
  ACCESS_KEY_ID,
  ACCESS_SECRET,
  AWS_REGION,
  BUCKET,
} = process.env;

// Configure AWS to use promise
AWS.config.setPromisesDependency(require('bluebird'));

AWS.config.update({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: ACCESS_SECRET,
  region: AWS_REGION,
});
const s3 = new AWS.S3();

module.exports = {
  save: async (path, image) => {
    // CDN서버에 이미지를 저장한다.
    const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (matches.length !== 3) return new Error('Invalid Base64 Image String');

    const base64Data = new Buffer.from(matches[2], 'base64');
    const type = matches[1];
    const uid = v4();
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
      debug(error);
    }
    return key;
  },
  delete: (Key) => {
    // CDN서버에 있는 이미지를 삭제한다.
    s3.deleteObject({ Bucket: BUCKET, Key }, (err, data) => {
      if (err) debug('err', err);
      else debug(data);
    });
  },
  saveBySftp: () => {},
  deleteBySftp: () => {},
};
