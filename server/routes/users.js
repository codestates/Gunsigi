const express = require('express');
const { body } = require('express-validator');
const token = require('../middlware/token');
const users = require('../controllers/users');
const validationError = require('../middlware/error');

const router = express.Router();
router.use(token.required);

// routes
router.get('/', users.get);
router.patch(
  '/',
  body('nickname')
    .optional()
    .isString()
    .withMessage('닉네임은 문자열 타입으로 입력해야 합니다.'),
  body('password')
    .optional()
    .isString()
    .withMessage('비밀번호는 문자열 타입으로 입력해야 합니다.'),
  body('profileImage')
    .optional(),
  validationError,
  users.patch,
);
router.delete('/', users.delete);

router.post('/test', async (req, res) => {
  const s3 = require('../modules/image');
  // 이미지 테스트
  const { image } = req.body;
  await s3.thumbnail('test', image);

  return res.json({ message: 'suc' });
});

module.exports = router;
