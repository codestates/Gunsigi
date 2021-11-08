const dotenv = require('dotenv');

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.dev';
dotenv.config({ path: envFile });

// const fs = require('fs');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const db = require('./models');
const router = require('./routes');

const mailer = require('./modules/email');

const app = express();
app.enable('trust proxy');
app.db = db;
app.mail = mailer;

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
// app.engine('html', (filepath, options, next) => {
//   fs.readFile(filepath, (err, content) => {
//     if (err) return next(err);
//     let rendered = content.toString();
//     rendered = rendered.replace('#title#', `<title>${options.title}</title>`);
//     Object.keys(options).forEach((key) => {
//       rendered = rendered.replace(`#${key}#`, `<meta>${options[key]}</meta>`);
//     });
//     return next(null, rendered);
//   });
// });

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
