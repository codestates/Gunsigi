const dotenv = require('dotenv');

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.dev';
dotenv.config({ path: envFile });

const fs = require('fs');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const router = require('./routes');

const app = express();
app.enable('trust proxy');

if (process.env.NODE_ENV === 'production') app.use(logger('combined'));
else {
  app.use(logger('dev'));
  app.db = require('./models');
  app.aes = require('./modules/aes');
  app.redis = require('./modules/redis');
}
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

app.get('/test', (req, res) => {
  res.render('failAuth', { url: process.env.URL });
});

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

module.exports = app;
