const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
    sign(data, process.env.ACCESS_SECRET, { expiresIn: '30m' });
  },
  generateRefreshToken: (data) => {
    sign(data, process.env.REFRESH_SECRET, { expiresIn: '30d' });
  },
  sendTokenInCookie: (res, accessToken) => {
    res.cookie('jwt', accessToken, { httpOnly: true, secure: false });
  },
  isAuthorized: (req) => verify(req.cookies.jwt, process.env.REFRESH_SECRET),
};
