var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var fcm = require('fcm');
var mongoose = require('mongoose');


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

app.post('/refresh', function(req, res) {


  console.log("refresh: start");
  var keys = Object.keys(req.query);
  for (var key of keys) {
    console.log(key + ": " + keys[key]);
  }
}); 

app.get('/searching', function(req, res){
  request({
    url : 'https://fcm.googleapis.com/fcm/send',
    method : 'POST',
    headers : {
      'Content-Type' : ' application/json',
      'Authorization' : 'key=AIzaSyCo1yoH8kBAzKGGDn36HG7cV1vKMqc6-_w'
    },
    body : JSON.stringify({
      "data": {
        "time": req.query.time,
        "latlng": req.query.latlng,
        "location": req.query.location
      },
      "to": "/topics/notice"
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
  res.send(req.query.latlng);
});

// models setup
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
	var volunteerSchema = new mongoose.Schema({
		name: String,
		phoneNumber: String,
		locs: [{type: String, coordinates: [Number]}],
		registration_id: String,
		job: String
	});
	var Volunteer = mongoose.model('Volunteer', volunteerSchema);
});

mongoose.connect('mongodb://localhost/test');

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
