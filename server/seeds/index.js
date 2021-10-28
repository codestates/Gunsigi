const debug = require('debug')('app');
const productSeed = require('./products');
const userSeed = require('./users');
const reviewSeed = require('./reviews');
const bookmarkSeed = require('./bookmarks');
const tagSeed = require('./tags');
const ingredientSeed = require('./ingredients');
const reviewImageSeed = require('./reviewImages');
const reviewLikeSeed = require('./reviewLikes');

module.exports = () => (
  Promise.all([userSeed(), tagSeed(), ingredientSeed()]).then(() => {
    debug('SuccessFully Users, Tags, Ingredients insert to DB');
    Promise.all([productSeed()]).then(() => {
      debug('Successfully insert Products');
      Promise.all([reviewSeed(), bookmarkSeed()]).then(() => {
        debug('Successfully insert other datas');
      }).then(() => {
        Promise.all([reviewImageSeed(), reviewLikeSeed()]);
      });
    });
  }).catch((err) => {
    if (process.env.NODE_ENV !== 'production') console.log(err);
    console.log('Fail to data seeding');
  })
);
