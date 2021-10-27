const uuid = require('uuid').v4;

const v4 = () => uuid().replace(/-/g, '').slice(0, 15);

module.exports = {
  save: (path) => {
    // CDN서버에 이미지를 저장한다.
    return v4();
  },
  delete: (path) => {
    // CDN서버에 있는 이미지를 삭제한다.
  },
};
