const express = require('express');
const { body } = require('express-validator');
const auth = require('../controllers/auth');
const validationError = require('../middlware/error');

const router = express.Router();

// 경로설정

// 로그아웃
router.get('/logout', auth.logout);

// 회원가입
router.post(
  '/signup',
  body('email')
    .notEmpty()
    .bail()
    .withMessage('이메일은 필수 입력값 입니다.')
    .isEmail()
    .withMessage('잘못된 이메일 형식입니다.'),
  body('nickname')
    .notEmpty()
    .withMessage('닉네임은 필수 입력값입니다.')
    .bail()
    .isString()
    .withMessage('닉네임은 문자열로 입력해야 합니다.')
    .isLength({ min: 2, max: 12 })
    .bail()
    .withMessage('닉네임은 2글자에서 12글자 사이로 입력해주세요.'),
  body('password')
    .notEmpty()
    .bail()
    .withMessage('비밀번호는 필수 입력값 입니다.')
    .isString()
    .bail()
    .withMessage('비밀번호는 문자열로 입력해야 합니다.')
    .isLength({ min: 6, max: 25 })
    .withMessage('비밀번호는 6자 이상 25자 이하입니다.'),
  validationError,
  auth.signup,
);

// 로그인
router.post(
  '/signin',
  body('email')
    .notEmpty()
    .bail()
    .withMessage('이메일은 필수 입력값 입니다.')
    .isEmail()
    .withMessage('잘못된 이메일 형식입니다.'),
  body('password')
    .notEmpty()
    .bail()
    .withMessage('비밀번호는 필수 입력값 입니다.')
    .isString()
    .bail()
    .withMessage('비밀번호는 문자열로 입력해야 합니다.')
    .isLength({ min: 6, max: 25 })
    .withMessage('비밀번호는 6자 이상 25자 이하입니다.'),
  validationError,
  auth.signin,
);

// 토큰갱신
router.post('/refresh', auth.refresh);

module.exports = router;
