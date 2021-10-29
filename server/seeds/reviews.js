/**
 * 건강기능식품 제품 데이터를 DB에 삽입
 */
const { Review } = require('../models');

module.exports = async () => {
  const count = await Review.count();
  if (count === 0) {
    // 없는 경우에만 데이터 넣기.
    return Review.bulkCreate([
      {
        userId: 1,
        productId: 1,
        content: '약빨 너무 좋아요!!!! 최고',
        period: '1개월 이하',
        score: 4,
        likesCount: 2,
      },
      {
        userId: 1,
        productId: 2,
        content: '먹고 젊음을 되찾았습니다.',
        period: '1개월 이하',
        score: 5,
        likesCount: 2,
      },
      {
        userId: 1,
        productId: 3,
        content: '먹고 젊음을 되찾았습니다.',
        period: '3개월 이상',
        score: 5,
      },
      {
        userId: 2,
        productId: 3,
        content: '먹고 젊음을 되찾았습니다.',
        period: '6개월 이상',
        score: 5,
      },
    ]);
  }
  // 데이터가 이미 있으면 성공처리
  return Promise.resolve(true);
};
