const axios = require('axios');
const { User } = require('../models');
const {
  generateAccessToken,
  generateRefreshToken,
  sendToCookie,
} = require('./token');

module.exports = {
  kakao: () => {},
  google: async (req, res) => {
    let result;
    try {
      // Token 검증
      result = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${req.body.idToken}`);
    } catch {
      return res.status(400).json({ message: 'invalid id token' });
    }
    const googleUser = result.data;
    let user;
    try {
      [user] = await User.findOrCreate({
        where: { uuid: googleUser.sub },
        efaults: {
          email: googleUser.email, nickname: googleUser.name, type: 'google', uuid: googleUser.sub,
        },
      });
    } catch {
      return res.status(400).json({ message: 'invalid id token' });
    }
    // 가입 or 로그인 완료 토큰 생성
    const accessToken = generateAccessToken(user.json());
    sendToCookie(res, generateRefreshToken(user.json()));
    return res.json({
      message: 'Success to login',
      accessToken,
      userInfo: user.json(),
    });
  },
  kakaoDelete: () => {},
};
