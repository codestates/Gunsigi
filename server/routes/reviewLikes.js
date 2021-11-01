const express = require('express');
const { body } = require('express-validator');
const reviewLikes = require('../controllers/reviewLikes');
const { tokenRequired } = require('../middlware/token');
const validationError = require('../middlware/error');

const router = express.Router();
router.use(tokenRequired);

// routes
router.post(
  '/',
  body('reviewId')
    .notEmpty()
    .withMessage('reviewId 는 필수 입력값입니다.')
    .isInt()
    .withMessage('reviewId 형식에 맞지 않습니다.'),
  validationError,
  reviewLikes.post,
);
router.delete(
  '/',
  body('reviewId')
    .notEmpty()
    .withMessage('reviewId 는 필수 입력값입니다.')
    .isInt()
    .withMessage('reviewId 형식에 맞지 않습니다.'),
  validationError,
  reviewLikes.delete,
);

module.exports = router;
