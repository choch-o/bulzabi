var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var fcm = require('fcm');



//mysql
var mysql = require("mysql");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {res.render('index')});

app.get('/searching', function(req, res){
  var message = { title : "title" , content : "content", imgUrl : "imgUrl" , link : "link" };
  request({
    url : 'https://fcm.googleapis.com/fcm/send',
    method : 'POST',
    headers : {
      'Content-Type' : ' application/json',
      'Authorization' : 'key=AIzaSyCo1yoH8kBAzKGGDn36HG7cV1vKMqc6-_w'
    },
    body : JSON.stringify({
      "data" : { "message" : message },
      "to" : "/topics/notice"
    })
  }, function(error, response, body) {
    if (error) {
      console.error(error, response, body);
    } else if (response.statusCode >= 400) {
      console.error('HTTP Error: ' + response.statusCode + ' - '  + response.statusMessage + '\n' + body);
    } else {
      console.log('Done')
    }
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
