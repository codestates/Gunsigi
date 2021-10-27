const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: '인자값이 잘못되었습니다.',
      error: errors.errors,
    });
  }
  return next();
};
