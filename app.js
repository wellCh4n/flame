var express = require('express');
var path = require('path')
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

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    if (req.method == 'OPTIONS') {
        res.send(200);
        return;
    }
    next();
});

app.use('/', indexRouter);
app.use('/init', initRouter);
app.use('/user', userRouter);
app.use('/article', articleRouter);

module.exports = app;