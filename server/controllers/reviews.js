const debug = require('debug')('app:review');
const {
  Review, reviewLike, reviewImage, sequelize, Product, User,
} = require('../models');
const paging = require('../modules/page');
const s3 = require('../modules/image');

module.exports = {
  mine: async (req, res) => {
    /**
     * 내가 쓴 리뷰 조회
     */
    const { page, size } = req.query;
    const { count, rows } = await Review.findAndCountAll({
      distinct: true,
      where: { userId: res.locals.user.id },
      limit: parseInt(size, 10),
      offset: (page - 1) * size,
      order: [['id', 'DESC']],
      include: [{
        model: reviewImage,
        as: 'images',
        attributes: ['image'],
      },
      {
        attributes: ['reviewId'],
        model: reviewLike,
        required: false,
        where: {
          userId: res.locals.user.id,
        },
      },
      {
        model: User,
        as: 'userInfo',
        attributes: ['id', 'profileImage', 'nickname'],
      },
      {
        model: Product,
        attributes: ['name'],
      },
      ],
    });
    return res.json({
      message: 'success to get reviews list',
      items: rows.map((row) => {
        const review = row.toJSON();
        review.images = review.images.map((image) => image.image);
        review.productName = review.Product.name;
        delete review.Product;

        // 리뷰에 좋아요 눌렀나?
        if (review.reviewLikes.length !== 0) review.isLike = true;
        else review.isLike = false;
        delete review.reviewLikes;

        return review;
      }),
      pages: { ...paging({ page, size, count }), itemsCount: count },
    });
  },
  get: async (req, res) => {
    /**
     * 제품 리뷰리스트 조회
     */
    const {
      page, size, filter, order,
    } = req.query;
    const params = {
      distinct: true,
      where: { productId: req.params.productId },
      limit: parseInt(size, 10),
      offset: (page - 1) * size,
      include: [
        {
          attributes: ['reviewId'],
          model: reviewLike,
          required: false,
          where: {
            userId: res.locals.user.id,
          },
        },
        {
          attributes: ['image'],
          model: reviewImage,
          as: 'images',
        },
        {
          attributes: ['id', 'nickname', 'profileImage'],
          model: User,
          as: 'userInfo',
        },
      ],
    };
    if (filter) params.where.period = filter;
    if (order === 'recent') params.order = [['createdAt', 'DESC'], ['likesCount', 'DESC']];
    else params.order = [['likesCount', 'DESC'], ['createdAt', 'DESC']];

    const { count, rows } = await Review.findAndCountAll(params);
    return res.json({
      message: 'Success to get reviews',
      items: rows.map((row) => {
        const review = row.toJSON();
        // 이미지
        review.images = review.images.map((image) => image.image);

        // 리뷰에 좋아요 눌렀나?
        if (review.reviewLikes.length !== 0) review.isLike = true;
        else review.isLike = false;
        delete review.reviewLikes;
        return review;
      }),
      pages: { ...paging({ page, size, count }), itemsCount: count },
    });
  },
  post: async (req, res) => {
    /**
     * 리뷰작성 컨트롤러
     * 기존에 리뷰가 있는지 체크
     * 새로운 리뷰를 생성하고 기존에 있었으면 Count는 증가시키지 않는다
     * 기존리뷰 삭제, 새로운 리뷰생성, Count증가를 하나의 트랜잭션으로 처리
     * 이미지가 있으면 S3에 저장
     * commit이 성공적으로 끝나면 삭제된 리뷰의 사진들을 삭제한다.
     * commit에 실패하면 저장했던 사진들을 다시 삭제한다.
     * after commit에 대한 후크는 모델파일에 작성
     */
    const { images } = req.body;
    delete req.body.images;
    let review;
    // let reviewImages;
    const transaction = await sequelize.transaction();
    try {
      let changeScore;
      let incrementCount;
      // 기존리뷰가 있다면 삭제
      const beforeReview = await Review.findOne({
        where: { userId: res.locals.user.id, productId: req.body.productId },
        individualHooks: true,
      });
      if (beforeReview) {
        changeScore = req.body.score - beforeReview.score;
        incrementCount = 0;
        // await Review.destroy({ where: { id: beforeReview.id }, transaction });
        await beforeReview.destroy({ transaction });
      } else {
        changeScore = req.body.score;
        incrementCount = 1;
      }

      review = await Review.create({
        ...req.body, userId: parseInt(res.locals.user.id, 10),
      }, { transaction });

      // 리뷰카운트, 총점 증가
      if (incrementCount) {
        await Product.increment('reviewsCount', {
          by: 1,
          where: { id: review.productId },
          transaction,
        });
        await User.increment('reviewsCount', {
          by: 1,
          where: { id: res.locals.user.id },
          transaction,
        });
      }
      if (changeScore) {
        await Product.increment('reviewsSum', {
          by: changeScore,
          where: { id: review.productId },
          transaction,
        });
      }
      // 이미지가 있다면 s3에 저장 reviews/리뷰ID 폴더 안에 전부 집어 넣는다
      const imageKeys = await Promise.all(images.map((image) => s3.compressAndSave(`reviews/${review.id}`, image)));

      await reviewImage.bulkCreate(imageKeys.map((image) => ({
        reviewId: review.id, image,
      })), { transaction });

      review = await Review.findByPk(review.id, {
        include: { model: reviewImage, as: 'images' },
        transaction,
      });
      review = review.toJSON();
      review.images = review.images.map((image) => image.image);

      // Commit
      await transaction.commit();
    } catch (err) {
      debug(err);
      await transaction.rollback();
      if (review?.id && images) await s3.deleteFolder(`reviews/${review.id}`);
      return res.status(403).json({ message: 'Invalid UserID' });
    }
    return res.json({
      message: 'Success to write review',
      review,
    });
  },
  delete: async (req, res) => {
    /**
     * 리뷰 삭제 컨트롤러
     * 리뷰삭제는 작성자만 할 수 있음.
     */
    const review = await Review.findByPk(req.body.reviewId);

    // 리뷰를 찾을 수 없음
    if (!review) return res.status(404).json({ message: 'Not Found' });

    // 본인의 리뷰가 아님
    if (review.userId !== res.locals.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // 리뷰 삭제 및 리뷰카운트 감소
    const transaction = await sequelize.transaction();
    try {
      // 리뷰카운트, 총점 증가
      await Product.decrement('reviewsCount', {
        by: 1,
        where: { id: review.productId },
        transaction,
      });
      await Product.decrement('reviewsSum', {
        by: review.score,
        where: { id: review.productId },
        transaction,
      });
      await User.decrement('reviewsCount', {
        by: 1,
        where: { id: res.locals.user.id },
        transaction,
      });
      await review.destroy({ transaction });
      await transaction.commit();
    } catch (err) {
      debug(err);
      await transaction.rollback();
      throw Error('delete review error');
    }
    return res.json({
      message: 'success to delete',
    });
  },
};
