/* eslint-disable global-require */
const dotenv = require('dotenv');

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.dev';
dotenv.config({ path: envFile });

const fs = require('fs');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const debug = require('debug')('app');
const router = require('./routes');

const app = express();
app.enable('trust proxy');

if (process.env.NODE_ENV === 'production') app.use(logger('combined'));
else app.use(logger('dev'));

app.use(
  express.json({
    limit: '100mb',
  }),
);
app.use(
  express.urlencoded({
    extended: false,
  }),
);
app.use(cookieParser());
app.use(express.static('public'));
app.use(
  cors({
    origin: [
      'https://www.gunsigi.com',
      'https://test.doldolma.com',
      'http://localhost:3000',
    ],
    credentials: true,
  }),
);

// 커스텀 템플릿 엔진
app.engine('html', (filepath, options, next) => {
  fs.readFile(filepath, (err, content) => {
    if (err) return next(err);
    const customOptions = options.options;
    let rendered = content.toString();
    Object.keys(customOptions).forEach((key) => {
      rendered = rendered.replaceAll(`#{${key}}`, `${customOptions[key]}`);
    });
    return next(null, rendered);
  });
});
app.set('view engine', 'html');

// 라우팅
app.use('/auth', router.auth);
app.use('/callback', router.oauth);
app.use('/users', router.users);
app.use('/products', router.products);
app.use('/reviews', router.reviews);
app.use('/review/like', router.reviewLikes);
app.use('/bookmarks', router.bookmarks);

// 로드밸런서 Health Check
app.get('/healthcheck', (_, res) => res.send(''));

app.get('/*', (_, res) => res.sendFile(`${__dirname}/public/index.html`));

// 테이블생성 및 시드 데이터 넣기
if (process.env.SEED) {
  const Seed = require('./seeds');
  const db = require('./models');
  db.sequelize
    .sync({ force: true })
    .then(() => Seed())
    .catch((err) => debug(err))
    .finally(() => process.exit());
}

if (process.env.NODE_ENV !== 'test') {
  debug(`NODE_ENV : ${process.env.NODE_ENV || 'development'}`);
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`listening : ${PORT}`));
} else {
  app.db = require('./models');
  app.redis = require('./modules/redis');
}

module.exports = app;
