/**
 * 건강기능식품 제품 데이터를 DB에 삽입
 */
const path = require('path');
const fs = require('fs').promises;
const { Tag } = require('../models');

module.exports = async () => {
  const count = await Tag.count();
  if (count > 0) return false;
  // 없는 경우에만 데이터 넣기.
  let tags;
  try {
    tags = JSON.parse(
      await fs.readFile(path.join(__dirname, './data/tags.json'), 'utf8'),
    );
  } catch {
    return false;
  }

  return Tag.bulkCreate(tags);
};
