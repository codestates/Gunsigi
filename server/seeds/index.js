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
    console.log('SuccessFully Users, Tags, Ingredients insert to DB');
    Promise.all([productSeed()]).then(() => {
      console.log('Successfully insert Products');
      Promise.all([reviewSeed(), bookmarkSeed()]).then(() => {
        console.log('Successfully insert other datas');
      }).then(() => {
        Promise.all([reviewImageSeed(), reviewLikeSeed()]);
      });
    });
  }).catch((err) => {
    if (process.env.NODE_ENV !== 'production') console.log(err);
    console.log('Fail to data seeding');
  })
);
