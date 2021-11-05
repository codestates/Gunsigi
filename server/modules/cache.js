const redis = require('redis');

const TTL = 3000;

const createClient = () => {
  const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  });
  client.on('error', (err) => {
    console.log('Redis Client Error : ', err);
  });
  return client;
};

module.exports = {
  get: async (key) => {
    const client = createClient();
    await client.connect();
    const result = await client.get(key);
    try {
      return JSON.parse(result);
    } catch {
      return result;
    }
  },
  set: async (key, value) => {
    const client = createClient();
    await client.connect();
    if (typeof (value) === 'object') {
      await client.set(key, JSON.stringify(value));
      return true;
    }
    await client.set(key, value);
    return true;
  },
};
