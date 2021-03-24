var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); 
const mongodb = require("mongodb");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var candidatesRouter = require('./routes/postcandidates');
var upDateCandidateRouter = require('./routes/updatecandidate');
var printCandidates = require('./routes/printcandidates');
var getChat = require('./routes/getchat');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/postcandidates', candidatesRouter);
app.use('/updatecandidate', upDateCandidateRouter);
app.use('/printcandidates', printCandidates);
app.use('/getchat', getChat);



let MongoClient = mongodb.MongoClient;

MongoClient.connect("mongodb://127.0.0.1:27017", function(err, client) {
    if (err !== null) {
        console.log(err);
    } else {
        app.locals.db = client.db("protres");
    }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
