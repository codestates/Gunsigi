/**
 * 건강기능식품 제품 데이터를 DB에 삽입
 */
const path = require('path');
const fs = require('fs').promises;
const {
  Product,
  Ingredient,
  ProductIngredients,
} = require('../models');

module.exports = async () => {
  const count = await Product.count();
  if (count === 0) {
    // 제품이 없는 경우에만 데이터 넣기.
    let products;
    try {
      products = JSON.parse(
        await fs.readFile(path.join(__dirname, './data/products.json'), 'utf8'),
      );
    } catch {
      return false;
    }
    return products.forEach(async (product) => {
      const post = await Product.create(product);
      // 성분표 매칭
      product.ingredients.forEach(async (ingredient) => {
        const [ing] = await Ingredient.findOrCreate({
          where: { name: ingredient },
          default: { name: ingredient },
        });
        try {
          await ProductIngredients.create({
            ProductId: post.id,
            IngredientId: ing.id,
          });
        } catch {}
      });
    });
  }
  return true;
};
