const debug = require('debug')('app');
const app = require('./app');
const Seed = require('./seeds');

debug(`현재 노드환경 : ${process.env.NODE_ENV || 'development'}`);

// 테이블생성 및 시드 데이터 넣기
app.db.sequelize
  .sync(process.env.SEED ? { force: true } : {})
  .then(() => Seed())
  .finally(() => {
    if (process.env.SEED) process.exit();
    const PORT = process.env.PORT || 4000;
    try {
      app.listen(PORT, () => console.log(`listening : ${PORT}`));
    } catch (err) {
      console.log(err);
      process.exit();
    }
  });
