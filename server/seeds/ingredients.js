/**
 * 건강기능식품 제품 데이터를 DB에 삽입
 */
const path = require('path');
const fs = require('fs').promises;
const { Ingredient } = require('../models');

module.exports = async () => {
  const count = await Ingredient.count();
  if (count === 0) {
    // 없는 경우에만 데이터 넣기.
    let ingredients;
    try {
      ingredients = JSON.parse(
        await fs.readFile(path.join(__dirname, './data/ingredients.json'), 'utf8'),
      );
    } catch {
      return false;
    }
    return Ingredient.bulkCreate(ingredients, { ignoreDuplicates: true });
  }
  // 데이터가 이미 있으면 성공처리
  return Promise.resolve(true);
};
