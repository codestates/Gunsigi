const debug = require('debug')('app.auth');
const { User } = require('../models');
const mailer = require('../modules/email');
const redisClient = require('../modules/redis');
const {
  createEmailToken,
  generateAccessToken,
  generateRefreshToken,
  sendToCookie,
  isAuthorized,
  decodeToken,
} = require('../modules/token');

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
  // 회원가입
  signup: async (req, res) => {
    let user;
    try {
      user = await User.create({ ...req.body, type: 'email' });
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(403).json({ message: '이미 사용중인 이메일입니다.' });
      }
      debug(err);
      return res.status(400).json({
        message: 'Fail to signup',
        result: false,
      });
    }
    // 인증메일 보내기
    const mailToken = createEmailToken(user.summary());
    res.render('authMail.html', { options: { url: `${process.env.URL}/auth/email/${encodeURIComponent(mailToken)}` } },
      async (err, output) => {
        try {
          await mailer.send(user.email, '건식이 이메일 주소 인증을 해주세요.', output);
        } catch (error) {
          await user.destroy();
          throw error;
        }
        // 토큰 생성
        const accessToken = generateAccessToken(user.json());
        sendToCookie(res, generateRefreshToken(user.json()));

        return res.status(201).json({
          message: 'Success to signup',
          accessToken,
          userInfo: user.json(),
        });
      });
  },

  // 로그인 - 완료
  signin: async (req, res) => {
    let user;
    try {
      user = await User.findOne({ where: { email: req.body.email, type: 'email' } });
      if (!user) throw new Error('UserNotFound');
      if (!user.isRight(req.body.password)) throw new Error('Invalid Password');
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
      user = await User.findByPk(userId, { attributes: ['id', 'email', 'type'] });
      if (!user) throw new Error('user not found');
    } catch {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const accessToken = generateAccessToken(user.toJSON());
    return res.json({
      message: 'Success to create access token',
      accessToken,
      userInfo: user.toJSON(),
    });
  },
  // 이메일 인증
  verifiyMail: async (req, res) => {
    const userInfo = decodeToken(req.params.token);
    // 잘못된 토큰
    if (!userInfo) return res.render('failAuth.html', { options: { url: process.env.URL } });

    const user = await User.findByPk(userInfo.id);
    // 존재하지 않는 회원
    if (!user || user?.email !== userInfo.email) {
      return res.render('failAuth.html', { options: { url: process.env.URL } });
    }

    user.verified = true;
    await user.save();

    return res.redirect(process.env.URL);
  },
  // 비밀번호 찾기 메일 전송
  forgetPassword: async (req, res) => {
    /**
     * 유저의 메일주소로 3시간 유효기간의 인증메일을 보낸다.
     */
    const { email } = req.body;
    const user = await User.findOne({ where: { email, type: 'email' } });
    if (!user) return res.status(400).json({ message: 'invalid Email address' });
    const mailToken = createEmailToken(user.summary());

    // redis 저장
    const result = await redisClient.set(mailToken, '1', 10800);
    if (!result) throw Error('Redis Connection Error');

    // 이메일 전송하기
    return res.render('resetPassword.html',
      { options: { url: `${process.env.URL}/reset?code=${encodeURIComponent(mailToken)}` } },
      async (err, output) => {
        await mailer.send(user.email, '건식이 비밀번호를 재설정해주세요.', output);
        return res.json({ message: 'success' });
      });
  },
  // 비밀번호 재설정
  resetPassword: async (req, res) => {
    // redis에 조회
    const { code } = req.body;
    const result = await redisClient.get(code);
    if (!result) return res.status(403).json({ message: 'Invalid code' });

    const userInfo = decodeToken(code);
    if (!userInfo) return res.status(403).json({ message: 'Invalid code' });

    const user = await User.findOne({ where: { email: userInfo.email, type: 'email' } });
    if (!user) return res.status(400).json({ message: 'invalid Email address' });

    user.password = req.body.password;
    await user.save();

    // 비밀번호 재설정 코드 삭제
    await redisClient.delete(code);

    return res.json({
      message: 'Success to set password',
    });
  },
};
