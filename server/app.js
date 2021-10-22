const dotenv = require('dotenv');
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.dev';
dotenv.config({ path: envFile });

var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(
  cors({
    origin: [
      "https://www.mellowboard.xyz",
      "https://test.doldolma.com",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

// 로드밸런서 Health Check
app.get("/healthcheck", (_, res) => res.send("Hi"));

app.get("/*", (req, res) => res.sendFile(`${__dirname}/public/index.html`));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

app.listen(process.env.PORT, () => console.log(`Listening : ${process.env.PORT}`));