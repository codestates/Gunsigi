const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => sign(data, process.env.ACCESS_SECRET, { expiresIn: '30d' }),
  generateRefreshToken: (data) => sign(data, process.env.REFRESH_SECRET, { expiresIn: '30d' }),
  sendToCookie: (res, accessToken) => res.cookie('jwt', accessToken, {
    httpOnly: true,
    secure: false,
  }),
  isAuthorized: (req) => verify(req.cookies.jwt, process.env.REFRESH_SECRET),
  emailCode: (userInfo) => {
    /**
     * 이메일 인증코드를 만들어서 Redis에 저장하고 인증코드를 리턴한다.
     */
  },
};
