const { reviewImage } = require('../models');

module.exports = async () => {
  const count = await reviewImage.count();
  if (count === 0) {
    // 없는 경우에만 데이터 넣기.
    return reviewImage.bulkCreate([
      {
        reviewId: 1,
        image: 'reviews/sample.jpg',
      },
      {
        reviewId: 2,
        image: 'reviews/sample.jpg',
      },
    ]);
  }
  // 데이터가 이미 있으면 성공처리
  return Promise.resolve(true);
};
