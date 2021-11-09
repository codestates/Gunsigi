const { sign, verify } = require('jsonwebtoken');
const aes = require('./aes');
const redis = require('./redis');

module.exports = {
  generateAccessToken: (data) => sign(data, process.env.ACCESS_SECRET, { expiresIn: '30d' }),
  generateRefreshToken: (data) => sign(data, process.env.REFRESH_SECRET, { expiresIn: '30d' }),
  sendToCookie: (res, accessToken) => res.cookie('jwt', accessToken, {
    httpOnly: true,
    secure: false,
  }),
  isAuthorized: (req) => verify(req.cookies.jwt, process.env.REFRESH_SECRET),
  createEmailToken: (userInfo) => aes.encrypt(JSON.stringify(userInfo)),
  createResetToken: async (userInfo) => {
    /**
     * 이메일 인증코드를 만들어서 Redis에 1시간 유효기간으로 저장하고 인증코드를 리턴한다.
     */
    const token = aes.encrypt(JSON.stringify(userInfo));
    await redis.set(token, true, 10800);
    return token;
  },
  decodeToken: (token) => {
    let result;
    try {
      result = JSON.parse(aes.decrypt(token));
    } catch {
      return false;
    }
    return result;
  },
};
