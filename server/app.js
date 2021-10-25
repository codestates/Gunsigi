const dotenv = require('dotenv');

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.dev';
dotenv.config({ path: envFile });

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const db = require('./models');
const Seed = require('./seeds');

const app = express();
app.enable('trust proxy');

if (process.env.NODE_ENV === 'production') app.use(logger('combined'));
else app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(
  cors({
    origin: [
      'https://www.gunsigi.com',
      'https://test.doldolma.com',
      'http://localhost:4000',
    ],
    credentials: true,
  }),
);

// 로드밸런서 Health Check
app.get('/healthcheck', (_, res) => res.send('hi'));

app.get('/*', (_, res) => res.sendFile(`${__dirname}/public/index.html`));

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

if (process.env.NODE_ENV !== 'production') {
  // 개발모드에서 테이블생성 및 시드 데이터 넣기
  // db.sequelize.sync({ force: true }).then(() => Seed());
  db.sequelize.sync();
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Listening : ${PORT}`));
