var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var initRouter = require('./routes/init');
var userRouter = require('./routes/user');
var articleRouter = require('./routes/article');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/init', initRouter);
app.use('/user', userRouter);
app.use('/article', articleRouter);

module.exports = app;
