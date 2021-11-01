const { verify } = require('jsonwebtoken');

module.exports = {
  required: async (req, res, next) => {
    /*
     * access token이 서버에서 발급한 것인지 확인한다.
     * user를 기록한다.
     * */
    const { authorization } = req.headers;
    let user;
    try {
      const accessToken = authorization.split(' ')[1];
      user = verify(accessToken, process.env.ACCESS_SECRET);
    } catch {
      return res.status(401).json({
        message: '토큰이 올바르지 않습니다.',
        result: false,
      });
    }
    res.locals.user = user;
    return next();
  },
  check: async (req, res, next) => {
    /**
     * 토큰을 조회해서 유저정보를 기록한다.
     * 토큰이 없으면 넘어간다.
     */
    const { authorization } = req.headers;
    let user;
    try {
      const accessToken = authorization.split(' ')[1];
      user = verify(accessToken, process.env.ACCESS_SECRET);
    } catch {
      user = { id: '' };
    }
    res.locals.user = user;
    return next();
  },
};
