const productSeed = require('./products');

module.exports = () => {
  Promise.all([
    productSeed(),
  ]).then(() => {
    console.log('SuccessFully Seeded DB');
  });
};
