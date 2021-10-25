/**
 * 건강기능식품 제품 데이터를 DB에 삽입
 */
const path = require('path');
const fs = require('fs').promises;
const { Product } = require('../models');

module.exports = async () => {
  const count = await Product.count();
  if (count === 0) {
    // 제품이 없는 경우에만 데이터 넣기.
    const products = JSON.parse(
      await fs.readFile(path.join(__dirname, './products.json'), 'utf8'),
    );
    return Product.bulkCreate(products);
  }
  // 데이터가 이미 있으면 성공처리
  return Promise.resolve(true);
};
