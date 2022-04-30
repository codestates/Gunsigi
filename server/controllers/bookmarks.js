const { Product, Bookmark, sequelize } = require('../models');
const paging = require('../modules/page');

module.exports = {
  get: async (req, res) => {
    // 내가 하트 누른 제품 목록
    const { page, size } = req.query;
    const { count, rows } = await Product.findAndCountAll({
      attributes: [
        'id',
        'name',
        'image',
        'reviewsSum',
        'reviewsCount',
        'views',
      ],
      limit: parseInt(size, 10),
      offset: (page - 1) * size,
      order: [[Bookmark, 'id', 'DESC']],
      include: {
        model: Bookmark,
        required: true,
        attributes: ['id'],
        where: { userId: res.locals.user.id },
      },
    });
    return res.json({
      message: 'Success to search products list',
      items: rows.map((row) => {
        const product = row.toJSON();
        product.score = parseFloat(
          (product.reviewsSum / product.reviewsCount || 0).toFixed(1),
        );
        product.isBookmarked = true;
        delete product.Bookmarks;
        delete product.reviewsSum;

        product.image = row.getThumbnail();

        return product;
      }),
      pages: {
        ...paging({ page, size, count }),
        itemCount: count,
      },
    });
  },
  post: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      await Promise.all([
        Bookmark.create({
          userId: res.locals.user.id,
          productId: req.body.productId,
        }, { transaction }),
        Product.increment('bookmarksCount', { by: 1, where: { id: req.body.productId }, transaction }),
      ]);
      await transaction.commit();
    } catch (err) {
      transaction.rollback();
      // 전에 좋아요 누른적 있음.
      if (err.name === 'SequelizeUniqueConstraintError') {
        // DB에 변화없이 그냥 성공처리
        return res.json({ message: 'success to bookmark' });
      }
      return res.status(404).json({ message: 'Invalid ProductId' });
    }
    return res.json({ message: 'success to bookmark' });
  },
  delete: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const result = await Bookmark.destroy({
        where: {
          userId: res.locals.user.id,
          productId: req.body.productId,
        },
        transaction,
      });
      if (result) {
        await Product.decrement('bookmarksCount', { by: 1, where: { id: req.body.productId }, transaction });
      }
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      return res.status(400).json({ message: 'Invalid productId' });
    }
    return res.json({ message: 'success' });
  },
};
