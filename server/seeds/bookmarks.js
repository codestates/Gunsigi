const { Bookmark } = require('../models');

module.exports = async () => {
  const count = await Bookmark.count();
  if (count > 0) return false;
  // 없는 경우에만 데이터 넣기.
  return Bookmark.bulkCreate([]);
};
