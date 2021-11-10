/**
 * 건강기능식품 제품 데이터를 DB에 삽입
 */
const { Review } = require('../models');

module.exports = async () => {
  const count = await Review.count();
  if (count > 0) return false;
  // 없는 경우에만 데이터 넣기.
  return Review.bulkCreate([]);
};
