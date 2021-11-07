const express = require('express');
const { query, body } = require('express-validator');
const bookmarks = require('../controllers/bookmarks');
const token = require('../middlware/token');
const validationError = require('../middlware/error');

const router = express.Router();
router.use(token.required);

// routes
router.get(
  '/',
  query('page').default(1).isInt({ min: 1 }).withMessage('page는 숫자로 입력해주세요'),
  query('size').default(30).isInt().withMessage('size는 숫자로 입력해주세요'),
  validationError,
  bookmarks.get,
);
router.post(
  '/',
  body('productId')
    .notEmpty()
    .withMessage('productId는 필수 입력값입니다.')
    .isInt()
    .withMessage('잘못된 productId 형식입니다.'),
  validationError,
  bookmarks.post,
);
router.delete(
  '/',
  body('productId')
    .notEmpty()
    .withMessage('productId는 필수 입력값입니다.')
    .isInt()
    .withMessage('잘못된 productId 형식입니다.'),
  validationError,
  bookmarks.delete,
);

module.exports = router;
