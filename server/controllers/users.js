const fs = require('fs');
const debug = require('debug')('app');
const { User } = require('../models');
const s3 = require('../modules/image');

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

    if (Object.prototype.hasOwnProperty.call(req.body, 'profileImage')) {
      // 프로필 이미지저장, 이미 있으면 기존꺼 삭제, 안에 값이 비어있으면 삭제만
      const imageName = await s3.save('profile', req.body.profileImage);
      if (user.profileImage) {
        // 기존 이미지 삭제
        s3.delete(user.profileImage);
      }
      user.profileImage = imageName;
      delete req.body.profileImage;
    }
    Object.keys(req.body).forEach(async (key) => {
      user[key] = req.body[key];
    });
    await user.save();
    return res.json({
      message: 'success to modify userInfo',
      userInfo: user.json(),
    });
  },
  delete: async (req, res) => {
    // 회원탈퇴
    await User.destroy({ where: { id: res.locals.user.id } });
    res.clearCookie('jwt');
    return res.json({
      message: 'delete user',
    });
  },
};
