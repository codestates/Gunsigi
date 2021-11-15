const redis = require('redis');

const TTL = 300;
const client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

client.connect();

client.on('error', (err) => {
  console.log(err);
  process.exit(-1);
});

module.exports = {
  get: async (key) => {
    const result = await client.get(key);
    try {
      return JSON.parse(result);
    } catch {
      return result;
    }
  },
  set: async (key, value, EX = TTL) => {
    if (typeof (value) === 'object') {
      await client.setEx(key, EX, JSON.stringify(value));
    } else {
      await client.setEx(key, EX, value);
    }
    return true;
  },
  delete: async (key) => {
    await client.del(key);
    return true;
  },
  quit: async () => {
    await client.quit();
  },
};
