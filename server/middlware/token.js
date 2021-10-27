const { verify } = require('jsonwebtoken');

module.exports = async (req, res, next) => {
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
};
