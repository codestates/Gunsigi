const { User } = require('../models');
const {
  generateAccessToken,
  generateRefreshToken,
  sendToCookie,
  isAuthorized,
} = require('./token');

module.exports = {
  overlap: async (req, res) => {
    const { email } = req.query;
    const user = await User.findOne({
      attributes: ['id'],
      where: { email },
    });
    if (user) return res.json({ message: '중복된 이메일입니다.', result: false });
    return res.json({ message: '사용가능한 이메일입니다.', result: true });
  },
  logout: (req, res) => {
    res.clearCookie('jwt');
    return res.json({ message: 'logout success' });
  },
  // 회원가입 - 완료
  signup: async (req, res) => {
    let user;
    try {
      user = await User.create(req.body);
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(403).json({ message: '이미 사용중인 이메일입니다.' });
      }
      return res.status(400).json({
        message: 'Fail to signup',
        result: false,
      });
    }

    // 토큰 생성
    const accessToken = generateAccessToken(user.json());
    sendToCookie(res, generateRefreshToken(user.json()));

    return res.status(201).json({
      message: 'Success to signup',
      accessToken,
      userInfo: user.json(),
    });
  },

  // 로그인 - 완료
  signin: async (req, res) => {
    let user;
    try {
      user = await User.findOne({ where: { email: req.body.email } });
      if (!user) throw new Error('UserNotFound');
      if (!await user.isRight(req.body.password)) throw new Error('Invalid Password');
    } catch (error) {
      return res.status(403).json({
        message: 'Fail to login',
      });
    }
    // 토큰 생성
    const accessToken = generateAccessToken(user.json());
    sendToCookie(res, generateRefreshToken(user.json()));

    return res.json({
      message: 'Success to login',
      accessToken,
      userInfo: user.json(),
    });
  },
  // 토큰 갱신 - 완료
  refresh: async (req, res) => {
    let user;
    try {
      const userId = isAuthorized(req).id;
      user = await User.findByPk(userId);
      if (!user) throw new Error('user not found');
    } catch {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const accessToken = generateAccessToken(user.json());
    return res.json({
      message: 'Success to create access token',
      accessToken,
      userInfo: user.json(),
    });
  },
};
