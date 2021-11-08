const debug = require('debug')('app:cache');
const cache = require('../modules/redis');

module.exports = async (req, res, next) => {
  if (!res.locals.user.id) {
    let cacheResult;
    try {
      cacheResult = await cache.get(req.url);
    } catch (e) {
      debug('cache error ', e);
      return next();
    }
    if (cacheResult) return res.json(cacheResult);
  }
  return next();
};
