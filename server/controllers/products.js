/* eslint-disable prefer-const */
const {
  Product, Bookmark, Ingredient, Sequelize, Tag, sequelize,
} = require('../models');
const paging = require('../modules/page');
const redisClient = require('../modules/redis');

module.exports = {
  search: async (req, res) => {
    /**
     * 검색 API
     */
    let {
      page, size, query, type,
    } = req.query;
    let order = req.query.order === 'reivews' ? 'reviewsCount' : 'views';
    if (['눈', '간', '뼈', '이', '키', '위', '장'].includes(query)) {
      type = 'category';
    }

    const params = {
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
      distinct: true,
      include: [
        {
          model: Bookmark,
          where: { userId: res.locals.user.id },
          required: false,
          duplicating: false,
        },
      ],
    };
    if (type === 'search') {
      // 검색 가중치부여
      let score;
      if (order === 'views') score = 2;
      else score = 5;
      params.attributes.push([
        `MATCH (name, company, functional) AGAINST("${query}" IN BOOLEAN MODE)+Product.${order}*${score}`, 'rating',
      ]);
      params.where = Sequelize.literal(
        `MATCH (name, company, functional) AGAINST("${query}" IN BOOLEAN MODE)`,
      );
      params.order = [
        [sequelize.literal('rating'), 'DESC'],
        [order, 'DESC'],
      ];
    } else {
      const ingredientsInclude = {
        model: Ingredient,
        attributes: ['id'],
      };
      if (req.query.order === 'reviewsCount') order = [['reviewsCount', 'DESC'], ['views', 'DESC']];
      else order = [['views', 'DESC'], ['reviewsCount', 'DESC']];
      params.order = order;
      if (type === 'category') {
        const tag = await Tag.findOne({
          attributes: ['ingredients'],
          where: { name: { [Sequelize.Op.like]: `${query}%` } },
        });
        ingredientsInclude.where = {
          name: { [Sequelize.Op.in]: tag?.ingredients || [] },
        };
      } else {
        ingredientsInclude.where = {
          name: { [Sequelize.Op.like]: `%${query}%` },
        };
      }
      params.include.push(ingredientsInclude);
    }
    const { count, rows } = await Product.findAndCountAll(params);
    const returnData = {
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
        delete product.rating;
        return product;
      }),
      pages: {
        ...paging({ page, size, count }),
        itemCount: count,
      },
    };
    // 캐시
    if (!res.locals.user.id) redisClient.set(req.url, returnData);
    return res.json(returnData);
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
    product.score = parseFloat((product.reviewsSum / product.reviewsCount).toFixed(1)) || 0;
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

    const returnData = {
      message: 'Success to get product info',
      itemInfo: {
        ...product,
        chemistry: {
          good: [...goods],
          bad: [...bads],
        },
      },
    };
    // 캐시
    if (!res.locals.user.id) redisClient.set(req.url, returnData);
    return res.json(returnData);
  },

  all: async (req, res) => {
    const { page, size } = req.query;
    let order;
    if (req.query.order === 'reviews') order = [['reviewsCount', 'DESC'], ['views', 'DESC']];
    else order = [['views', 'DESC'], ['reviewsCount', 'DESC']];
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
      distinct: true,
      offset: (page - 1) * size,
      order,
      include: [
        {
          model: Bookmark,
          where: { userId: res.locals.user.id },
          required: false,
        },
      ],
    });
    const returnData = {
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
    };
    // 캐시
    if (!res.locals.user.id) redisClient.set(req.url, returnData);
    return res.json(returnData);
  },
};
