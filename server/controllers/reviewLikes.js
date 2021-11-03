const { Review, reviewLike, sequelize } = require('../models');

module.exports = {
  // 리뷰에 좋아요 하기
  post: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      await reviewLike.create({
        userId: res.locals.user.id,
        reviewId: req.body.reviewId,
      }, {
        transaction,
      });
      await Review.increment('likesCount', { by: 1, where: { id: req.body.reviewId }, transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.json({ message: 'success' });
      }
      return res.status(400).json({ message: 'Invalid reviewId' });
    }
    return res.json({ message: 'success' });
  },

  // 리뷰에 좋아요 취소하기
  delete: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      await reviewLike.destroy({
        where: {
          userId: res.locals.user.id,
          reviewId: req.body.reviewId,
        },
        transaction,
      });
      // 숫자 감소
      await Review.decrement('likesCount', {
        by: 1,
        where: { id: req.body.reviewId },
        transaction,
      });
      await transaction.commit();
    } catch {
      await transaction.rollback();
    }
    return res.json({ message: 'success' });
  },
};
