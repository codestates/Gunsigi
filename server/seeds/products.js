/**
 * 건강기능식품 제품 데이터를 DB에 삽입
 */
const path = require('path');
const fs = require('fs').promises;
const {
  Product,
  Ingredient,
  ProductIngredients,
  sequelize,
} = require('../models');

module.exports = {
  productsSeed: async () => {
    const count = await Product.count();
    if (count > 0) return false;

    // 제품이 없는 경우에만 데이터 넣기.
    let productsJson;
    try {
      productsJson = JSON.parse(
        await fs.readFile(path.join(__dirname, './data/products.json'), 'utf8'),
      );
    } catch {
      return Promise.reject(new Error('Fail to load file'));
    }

    // 이미지가 있으면 조회수 +10
    productsJson = productsJson.map((product) => {
      // eslint-disable-next-line no-param-reassign
      if (product.image) product.views = 10;
      return product;
    });

    // 제품에 있는 성분들 뽑기
    const ingredientsSet = new Set();
    productsJson.forEach((pro) => {
      pro.ingredients.forEach((ing) => ingredientsSet.add(ing));
    });

    // 제품 전부 DB에 넣기
    const products = await Product.bulkCreate(productsJson, {
      returning: true,
    });

    // DB에 있는 성분 정보 다 가져오기
    const ingredientsDB = await Ingredient.findAll();
    const ingredients = {};
    ingredientsDB.forEach((ing) => {
      ingredients[ing.name] = ing.id;
    });

    // 제품과 성분 연결테이블 row 만들기
    const productIngredient = [];
    products.forEach((product, idx) => {
      productsJson[idx].ingredients.forEach(async (ing) => {
        if (!ingredients[ing]) {
          ingredients[ing] = await Ingredient.findOne({ where: { name: ing } });
        }
        productIngredient.push({
          ProductId: product.id,
          IngredientId: ingredients[ing],
        });
      });
    });

    // 연결테이블 삽입
    await ProductIngredients.bulkCreate(productIngredient);
    return true;
  },
  addFulltextIndex: async () => {
    let result;
    try {
      result = await sequelize.query(
        'CREATE FULLTEXT INDEX Products_search_views ON Products(name,company,functional) WITH PARSER ngram;',
      );
    // eslint-disable-next-line no-empty
    } catch { }
    return result;
  },
};
