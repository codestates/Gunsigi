const { reviewLike } = require('../models');

module.exports = async () => {
  const count = await reviewLike.count();
  if (count > 0) return false;
  // 없는 경우에만 데이터 넣기.
  return reviewLike.bulkCreate([
    {
      reviewId: 1,
      userId: 1,
    },
    {
      reviewId: 2,
      userId: 1,
    },
    {
      reviewId: 1,
      userId: 2,
    },
    {
      reviewId: 2,
      userId: 2,
    },
  ]);
};
