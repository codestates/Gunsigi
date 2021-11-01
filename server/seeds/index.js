const debug = require('debug')('app:seed');
const { productsSeed, addFulltextIndex } = require('./products');
const userSeed = require('./users');
const reviewSeed = require('./reviews');
const bookmarkSeed = require('./bookmarks');
const tagSeed = require('./tags');
const ingredientSeed = require('./ingredients');
const reviewImageSeed = require('./reviewImages');
const reviewLikeSeed = require('./reviewLikes');

module.exports = async function Seed() {
  try {
    if ((await Promise.all([userSeed(), tagSeed(), ingredientSeed()])).every((r) => r)) {
      debug('Users, Tags, Ingredients 시드 데이터 삽입 완료');
    }
    if ((await Promise.all([productsSeed(), addFulltextIndex()])).every((r) => r)) {
      debug('제품 시드 데이터 삽입, Full Text Index 생성 완료');
    }

    if ((await Promise.all([reviewSeed(), bookmarkSeed()])).every((r) => r)) {
      debug('리뷰, 북마크 시드 데이터 삽입 완료');
    }

    if ((await Promise.all([reviewImageSeed(), reviewLikeSeed()])).every((r) => r)) {
      debug('리뷰이미지, 리뷰좋아요 시드 데이터 삽입 완료');
    }
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') debug(err);
    debug('시드 데이터 삽입에 실패했습니다.');
    return Promise.reject(err);
  }

  debug('모든 시드 데이터 삽입 완료');
  return true;
};
