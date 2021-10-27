const fs = require('fs');
const debug = require('debug')('app');
const { User } = require('../models');
const image = require('../modules/image');

module.exports = {
  get: async (req, res) => {
    const user = await User.findByPk(res.locals.user.id);
    if (!user) {
      // 유저 정보가 없음
      return res.status(400).json({ Message: 'Invalid Token' });
    }
    return res.json({
      message: 'success to get userInfo',
      userInfo: user.json(),
    });
  },
  patch: async (req, res) => {
    const user = await User.findByPk(res.locals.user.id);
    if (!user) {
      // 유저 정보가 없음
      return res.status(400).json({ Message: 'Invalid Token' });
    }
    Object.keys(req.body).forEach((key) => {
      if (key === 'profileImage') {
        // 프로필 이미지 저장 일단 서버에 저장
        console.log('uuid : ', image.save());
        fs.writeFileSync(
          'test.jpg',
          req.body.profileImage.replace(/^data:image\/jpeg;base64,/, ''),
          'base64',
          (err) => {
            if (err) {
              debug(err);
              return res.status(400).json({ message: 'Invalid Image' });
            }
          },
        );
      } else {
        user[key] = req.body[key];
      }
    });
    user.save();
    return res.json({
      message: 'success to modify userInfo',
      userInfo: user.json(),
    });
  },
  delete: () => {},
};
