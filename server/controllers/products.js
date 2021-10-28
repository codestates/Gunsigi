const { Product, Bookmark, Ingredient } = require('../models');

module.exports = {
  search: () => {},
  detail: async (req, res) => {
    let product = await Product.findOne({
      where: { id: req.params.productId },
      include: [{ model: Bookmark, where: { userId: res.locals.user.id }, required: false },
        { model: Ingredient },
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
    delete product.reviewsCount;
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
};
