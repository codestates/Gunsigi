/**
 * 건강기능식품 제품 데이터를 DB에 삽입
 */
const path = require('path');
const fs = require('fs').promises;
const { Product } = require('../models');

module.exports = async () => {
  const products = JSON.parse(
    await fs.readFile(path.join(__dirname, './healthfoods_v2.json'), 'utf8'),
  );
  return Product.bulkCreate(products);
};
