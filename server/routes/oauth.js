const express = require('express');
const { body } = require('express-validator');
const validationError = require('../middlware/token');
const oauth = require('../controllers/oauth');

const router = express.Router();

router.post('/kakao', oauth.kakao);

router.post('/google',
  body('idToken').notEmpty(),
  oauth.google);

router.get('/kakao/delete', oauth.kakaoDelete);

module.exports = router;
