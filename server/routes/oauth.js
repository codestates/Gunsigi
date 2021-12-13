const express = require('express');
const { body, query } = require('express-validator');
const validationError = require('../middlware/error');
const oauth = require('../controllers/oauth');

const router = express.Router();

router.post('/kakao',
  body('accessToken').notEmpty().withMessage('accessToken 은 필수 입력값입니다.'),
  validationError,
  oauth.kakao);

router.post('/google',
  body('idToken').notEmpty().withMessage('idToken 은 필수 입력값입니다.'),
  validationError,
  oauth.google);

router.get('/kakao/delete',
  query('user_id').notEmpty(),
  query('referrer_type').notEmpty(),
  validationError,
  oauth.kakaoDelete);

module.exports = router;
