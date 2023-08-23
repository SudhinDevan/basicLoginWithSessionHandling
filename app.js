const createError = require('http-errors');
const express = require('express');
const path = require('path');
const sessions = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));


const oneWeek = 1000 * 60 * 60 * 24 * 7;
app.use(sessions({
  secret: "thisismysecrete",
  saveUninitialized: true,
  cookie: { maxAge: oneWeek },
  resave: false
}));

//to prevent storing cache
app.use((req, res, next) => {
  res.set(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate",
  );
  next();
})

app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = 3000;
app.listen(port, () => {
    console.log("server started at " + port);
})

module.exports = app;
