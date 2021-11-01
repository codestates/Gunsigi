const axios = require('axios');
const { User } = require('../models');
const s3 = require('../modules/image');
const {
  generateAccessToken,
  generateRefreshToken,
  sendToCookie,
} = require('./token');

module.exports = {
  kakao: async (req, res) => {
    const kakaoToken = req.body.accessToken;

    // 유저정보 로딩, 가져올수있으면
    let userInfo;
    try {
      userInfo = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: { Authorization: `Bearer ${kakaoToken}` },
      });
    } catch {
      return res.status(403).json({ message: 'Fail to kakao login' });
    }
    userInfo = userInfo.data;

    let user;
    let created;
    try {
      [user, created] = await User.findOrCreate({
        where: { uuid: userInfo.id },
        defaults: {
          email: userInfo.kakao_account?.email,
          nickname: userInfo.kakao_account.profile.nickname,
          type: 'kakao',
          uuid: userInfo.id,
        },
      });
    } catch (err) {
      return res.status(400).json({ message: 'Fail to kakao login' });
    }

    if (created && userInfo.kakao_account.profile?.thumbnail_image_url) {
      // 신규 가입유저 사진저장
      const image = await axios.get(userInfo.kakao_account.profile?.thumbnail_image_url,
        { responseType: 'arraybuffer' })
        .then((response) => Buffer.from(response.data, 'binary').toString('base64'))
        .then((img) => `data:image/jpeg;base64,${img}`);

      user.profileImage = await s3.save('profile', image);
      user.save();
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
    let created;
    try {
      [user, created] = await User.findOrCreate({
        where: { uuid: googleUser.sub },
        defaults: {
          email: googleUser.email, nickname: googleUser.name, type: 'google', uuid: googleUser.sub,
        },
      });
    } catch {
      return res.status(400).json({ message: 'invalid id token' });
    }
    if (created && googleUser.picture) {
      // 신규가입자. 프로필사진이 있는지 확인후 저장해서 DB에 입력한다.
      const image = await axios.get(googleUser.picture, { responseType: 'arraybuffer' })
        .then((response) => Buffer.from(response.data, 'binary').toString('base64'))
        .then((img) => `data:image/jpeg;base64,${img}`);
      user.profileImage = await s3.save('profile', image);
      user.save();
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
