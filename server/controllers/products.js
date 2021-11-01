const { Product, Bookmark, Ingredient, Sequelize, Tag } = require('../models');
const paging = require('../modules/page');

module.exports = {
  search: async (req, res) => {
    /**
     * 검색 API
     */
    const { page, size, query, type, order } = req.query;
    const params = {
      attributes: [
        'id',
        'name',
        'image',
        'reviewsSum',
        'reviewsCount',
        'views',
      ],
      limit: size,
      offset: (page - 1) * size,
      order: [[order, 'DESC']],
      include: [
        {
          model: Bookmark,
          where: { userId: res.locals.user.id },
          required: false,
        },
      ],
    };
    if (type === 'search') {
      params.where = Sequelize.literal(
        `MATCH (name, company, functional) AGAINST("${query}" IN BOOLEAN MODE)`,
      );
    } else {
      params.include.push({
        model: Ingredient,
        attributes: ['id'],
      });
      if (type === 'category') {
        const tag = await Tag.findOne({ where: { name: query } });
        params.include.where = {
          name: { [Sequelize.Op.in]: tag?.ingredients || [] },
        };
      } else {
        params.include.where = { name: query };
      }
    }
    const { count, rows } = await Product.findAndCountAll(params);
    return res.json({
      message: 'Success to search products list',
      items: rows.map((row) => {
        const product = row.toJSON();
        product.score = parseFloat(
          (product.reviewsSum / product.reviewsCount || 0).toFixed(1),
        );
        // 북마크 한적 있는지?
        if (product.Bookmarks.length === 0) product.isBookmarked = false;
        else product.isBookmarked = true;
        delete product.Bookmarks;
        delete product.reviewsSum;
        delete product.Ingredients;
        return product;
      }),
      pages: {
        ...paging({ page, size, count }),
        itemCount: count,
      },
    });
  },
  detail: async (req, res) => {
    let product = await Product.findOne({
      where: { id: req.params.productId },
      include: [
        {
          model: Bookmark,
          where: { userId: res.locals.user.id },
          required: false,
        },
        {
          model: Ingredient,
          attributes: ['good', 'bad'],
        },
      ],
    });
    if (!product) {
      return res.status(404).json({
        message: 'not found',
      });
    }

    // 평균점수
    product = product.toJSON();
    product.score = Math.round(product.reviewsSum / product.reviewsCount) || 0;
    delete product.reviewsSum;

    // 북마크 한적 있는지?
    if (product.Bookmarks.length === 0) product.isBookmarked = false;
    else product.isBookmarked = true;
    delete product.Bookmarks;

    // 궁합표
    const goods = new Set();
    const bads = new Set();
    product.Ingredients.forEach((ingredient) => {
      ingredient.good.forEach((ing) => goods.add(ing));
      ingredient.bad.forEach((ing) => bads.add(ing));
    });
    delete product.Ingredients;

    // 조회수증가
    Product.increment('views', { by: 1, where: { id: req.params.productId } });

    return res.json({
      message: 'Success to get product info',
      itemInfo: {
        ...product,
        chemistry: {
          good: [...goods],
          bad: [...bads],
        },
      },
    });
  },
  all: async (req, res) => {
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
      limit: size,
      offset: (page - 1) * size,
      order: [['views', 'DESC']],
      include: [
        {
          model: Bookmark,
          where: { userId: res.locals.user.id },
          required: false,
        },
      ],
    });
    return res.json({
      message: 'Success to search products list',
      items: rows.map((row) => {
        const product = row.toJSON();
        product.score = parseFloat(
          (product.reviewsSum / product.reviewsCount || 0).toFixed(1),
        );
        // 북마크 한적 있는지?
        if (product.Bookmarks.length === 0) product.isBookmarked = false;
        else product.isBookmarked = true;
        delete product.Bookmarks;
        delete product.reviewsSum;
        return product;
      }),
      pages: {
        ...paging({ page, size, count }),
        itemCount: count,
      },
    });
  },
};
