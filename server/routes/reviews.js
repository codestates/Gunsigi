const express = require('express');
const { param, query, body } = require('express-validator');
const reviews = require('../controllers/reviews');
const { tokenRequired, tokenCheck } = require('../middlware/token');
const validationError = require('../middlware/error');

const router = express.Router();

router.get(
  '/',
  query('page').default(1).isInt().withMessage('page에 숫자를 입력해주세요'),
  query('size').default(30).isInt().withMessage('size에 숫자를 입력해주세요'),
  tokenRequired,
  reviews.mine,
);
router.get(
  '/:productId',
  param('productId').notEmpty().bail().withMessage('productId는 필수입니다.'),
  query('page').default(1).isInt().withMessage('page에 숫자를 입력해주세요'),
  query('size').default(30).isInt().withMessage('size에 숫자를 입력해주세요'),
  query('order')
    .default('recent')
    .isIn(['recent', 'like'])
    .withMessage('order는 recent , like 중에 하나의 값을 넣어주세요'),
  query('filter')
    .optional()
    .isIn(['1개월 이하', '3개월 이상', '6개월 이상', '1년 이상'])
    .withMessage(
      `filter는 ${[
        '1개월 이하',
        '3개월 이상',
        '6개월 이상',
        '1년 이상',
      ]} 중 하나의 값을 넣어주세요`,
    ),
  validationError,
  tokenCheck,
  reviews.get,
);
router.post(
  '/',
  body('productId')
    .notEmpty()
    .withMessage('productId는 필수 입력값입니다.')
    .isInt()
    .withMessage('잘못된 productId 형식입니다.'),
  body('content')
    .notEmpty()
    .withMessage('content는 필수 입력값입니다.')
    .isString()
    .withMessage('content는 문자열 형식입니다.')
    .isLength({ min: 1, max: 120 })
    .withMessage('content는 1자이상 100자 이하로 입력해주세요'),
  body('score')
    .notEmpty()
    .withMessage('score는 필수 입력값입니다.')
    .isInt({ min: 0, max: 5 })
    .withMessage('score에 0에서 5 사이의 정수를 입력해주세요'),
  body('period')
    .notEmpty()
    .withMessage('period는 필수 입력값입니다.')
    .isIn(['1개월 이하', '3개월 이상', '6개월 이상', '1년 이상'])
    .withMessage(
      `filter는 ${[
        '1개월 이하',
        '3개월 이상',
        '6개월 이상',
        '1년 이상',
      ]} 중 하나의 값을 넣어주세요`,
    ),
  body('images')
    .optional()
    .isArray()
    .withMessage('images는 base64로 이루어진 배열형식입니다.'),
  validationError,
  tokenRequired,
  reviews.post,
);
router.delete(
  '/',
  body('reviewId')
    .notEmpty()
    .withMessage('reviewId 는 필수 입력값입니다.')
    .isInt()
    .withMessage('reviewId 형식이 맞지 않습니다.'),
  validationError,
  tokenRequired,
  reviews.delete,
);

module.exports = router;
