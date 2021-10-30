const { Review, reviewLike, sequelize } = require('../models');

module.exports = {
  // 리뷰에 좋아요 하기
  post: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const result = await reviewLike.findOrCreate({
        where: {
          userId: res.locals.user.id,
          reviewId: req.body.reviewId,
        },
        transaction,
      });
      if (result[1]) {
        // 새롭게 좋아요 했을때만 숫자증가
        await Review.increment('likesCount', {
          by: 1,
          where: { id: req.body.reviewId },
          transaction,
        });
      }
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      return res.status(400).json({ message: 'Invalid reviewId or already be liked' });
    }
    return res.json({ message: 'success' });
  },

  // 리뷰에 좋아요 취소하기
  delete: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const result = await reviewLike.destroy({
        where: {
          userId: res.locals.user.id,
          reviewId: req.body.reviewId,
        },
        transaction,
      });
      if (result) {
        // 삭제가 되었을때만 숫자 감소
        await Review.decrement('likesCount', {
          by: 1,
          where: { id: req.body.reviewId },
          transaction,
        });
      }
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      return res.status(400).json({ message: 'Invalid reviewId' });
    }
    return res.json({ message: 'success' });
  },
};
