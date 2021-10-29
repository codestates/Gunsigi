const express = require('express');
const { body } = require('express-validator');
const { tokenRequired } = require('../middlware/token');
const users = require('../controllers/users');
const validationError = require('../middlware/error');

const router = express.Router();
router.use(tokenRequired);

// // routes
router.get('/', users.get);
router.patch(
  '/',
  body('nickname')
    .optional()
    .isString()
    .withMessage('닉네임은 문자열 타입으로 입력해야 합니다.')
    .isLength({ min: 2, max: 12 })
    .withMessage('닉네임은 2글자에서 12글자 사이로 입력해주세요.'),
  body('password')
    .optional()
    .isString()
    .withMessage('비밀번호는 문자열 타입으로 입력해야 합니다.')
    .isLength({ min: 6, max: 25 })
    .withMessage('비밀번호는 6자 이상 25자 이하입니다.'),
  body('profileImage')
    .optional(),
  validationError,
  users.patch,
);
router.delete('/', users.delete);

module.exports = router;
