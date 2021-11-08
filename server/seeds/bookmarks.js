const { Bookmark } = require('../models');

module.exports = async () => {
  const count = await Bookmark.count();
  if (count > 0) return false;
  // 없는 경우에만 데이터 넣기.
  return Bookmark.bulkCreate([
    {
      userId: 1,
      productId: 1,
    },
    {
      userId: 1,
      productId: 2,
    },
    {
      userId: 1,
      productId: 3,
    },
    {
      userId: 1,
      productId: 4,
    },
    {
      userId: 2,
      productId: 1,
    },
    {
      userId: 2,
      productId: 2,
    },
    {
      userId: 2,
      productId: 3,
    },
    {
      userId: 2,
      productId: 4,
    },
  ]);
};
