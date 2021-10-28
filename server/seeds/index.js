const debug = require('debug')('app');
const productSeed = require('./products');
const userSeed = require('./users');
const reviewSeed = require('./reviews');
const bookmarkSeed = require('./bookmarks');
const tagSeed = require('./tags');
const ingredientSeed = require('./ingredients');
const reviewImageSeed = require('./reviewImages');
const reviewLikeSeed = require('./reviewLikes');

module.exports = function () {
  return Promise.all([userSeed(), tagSeed(), ingredientSeed()])
    .then(async () => {
      debug('Users, Tags, Ingredients 시드 데이터 삽입 완료');
      await Promise.all([productSeed()]).then(async () => {
        debug('제품 시드 데이터 삽입 완료');
        await Promise.all([reviewSeed(), bookmarkSeed()])
          .then(() => debug('리뷰, 북마크 시드 데이터 삽입 완료'))
          .then(async () => {
            await Promise.all([reviewImageSeed(), reviewLikeSeed()]);
          }).then(() => debug('리뷰이미지, 리뷰좋아요 시드 데이터 삽입 완료'));
      });
    })
    .then(() => {
      debug('모든 시드 데이터 삽입 완료');
    })
    .catch((err) => {
      if (process.env.NODE_ENV !== 'production') debug(err);
      debug('시드 데이터 삽입에 실패했습니다.');
    });
};
