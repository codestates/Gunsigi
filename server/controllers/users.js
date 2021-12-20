const debug = require('debug')('app:user');
const {
  User,
  Review,
  Product,
  sequelize,
  Bookmark,
  Sequelize,
  reviewLike,
} = require('../models');
const s3 = require('../modules/image');

module.exports = {
  get: async (req, res) => {
    const user = await User.findByPk(res.locals.user.id);
    if (!user) {
      // 유저 정보가 없음
      return res.status(400).json({ Message: 'Invalid Token' });
    }
    return res.json({
      message: 'success to get userInfo',
      userInfo: user.json(),
    });
  },
  patch: async (req, res) => {
    const user = await User.findByPk(res.locals.user.id);
    if (!user) {
      // 유저 정보가 없음
      return res.status(400).json({ Message: 'Invalid Token' });
    }

    if (req.body.profileImage) {
      // 프로필 이미지저장, 이미 있으면 기존꺼 삭제, 안에 값이 비어있으면 삭제만
      const imageName = await s3.thumbnailAndSave('profile', req.body.profileImage);
      if (user.profileImage) {
        // 기존 이미지 삭제
        await s3.delete(user.profileImage);
      }
      user.profileImage = imageName;
      delete req.body.profileImage;
    } else if (req.body.profileImage === '' && user.profileImage) {
      // 기존 이미지 삭제
      await s3.delete(user.profileImage);
      user.profileImage = '';
    }
    Object.keys(req.body).forEach((key) => {
      if (req.body[key]) user[key] = req.body[key];
    });
    await user.save();
    return res.json({
      message: 'success to modify userInfo',
      userInfo: user.json(),
    });
  },
  delete: async (req, res) => {
    // 회원탈퇴
    res.clearCookie('jwt');
    const user = await User.findByPk(res.locals.user.id, {
      include: [{ model: Review }, { model: Bookmark }, { model: reviewLike }],
    });
    if (!user) {
      return res.status(401).json({
        message: 'Invalid Token',
      });
    }

    // 삭제 커밋이 확실하게 수행되고 나서 프로필 이미지를 삭제하기 위해 트랜잭션생성
    // 프로필 이미지 삭제 훅은 모델파일에 정의
    const transaction = await sequelize.transaction();
    try {
      await Promise.all([
        // 리뷰수 감소
        Product.decrement('reviewsCount', {
          by: 1,
          where: { id: { [Sequelize.Op.in]: user.Reviews.map((r) => r.productId) } },
          transaction,
        }),
        // 북마크 감소
        Product.decrement('bookmarksCount', {
          by: 1,
          where: { id: { [Sequelize.Op.in]: user.Bookmarks.map((r) => r.productId) } },
          transaction,
        }),
        // 리뷰에 좋아요 수 감소
        Review.decrement('likesCount', {
          by: 1,
          where: { id: { [Sequelize.Op.in]: user.reviewLikes.map((r) => r.reviewId) } },
          transaction,
        }),
        // 리뷰 점수 감소
      ].concat(Promise.all(user.Reviews.map((review) => Product.decrement('reviewsSum', {
        by: review.score,
        where: { id: review.productId },
        transaction,
      })))));

      await user.destroy({ transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      debug(err);
      throw err;
    }
    return res.json({
      message: 'delete user',
    });
  },
};
