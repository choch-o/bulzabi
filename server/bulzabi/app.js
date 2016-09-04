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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {res.render('index')});

 

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
var Volunteer, tokenModel;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
	var volunteerSchema = new mongoose.Schema({
		name: String,
		phoneNumber: String,
		locs: [{type: String, coordinates: [Number]}],
		registration_id: String,
		job: String
	});
	Volunteer = mongoose.model('Volunteer', volunteerSchema);

        var tokenSchema;
        //tokenModel;
});

mongoose.connect('mongodb://localhost/test');

app.post('/register', function(req, res) {
  console.log("register: start");

  var newVolunteer = new Volunteer({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    locs: [{ type: req.body.locs1.addr, coordinates: [req.body.locs1.lat, req.body.locs1.lng] },
      { type: req.body.locs2.addr, coordinates: [req.body.locs2.lat, req.body.locs2.lng] },
      { type: req.body.locs3.addr, coordinates: [req.body.locs3.lat, req.body.locs3.lng] } ],
    registration_id: req.body.registration_id,
    job: req.body.job
  });
  newVolunteer.save(function(err, book){
    if(err) return console.error(err);
    console.dir(newVolunteer);
  });
});

app.post('/refresh', function(req, res) {
  console.log("refresh: PHONE_NUMBER"+req.query.phoneNumber);
  console.log("refresh: TOKEN"+req.body.phoneNumber);
  console.log("refresh: TOKEN"+req.params.phoneNumber);

  console.log("refresh: TOKEN"+req.query.registration_id);
  console.log("refresh: TOKEN"+req.body.registration_id);
  console.log("refresh: TOKEN"+req.params.registration_id);

  
  var keys = Object.keys(req.body);
  for (var key of keys) {
    console.log(key + ": " + req.body.key);
  }
  var keyss = Object.keys(req.params);
  for (var keyy of keyss) {
    console.log(keyy + ": " + req.params.keyy);
  }

  tokenModel.findOne({phoneNumber: req.body.PHONE_NUMBER}, function(err, token) {
    if(err) return res.status(500).json({error: err});
    if(!token) {
      // new token. insert it.
      console.log("new token is inserted");
    }
    // replace old token with new one.
    console.log("old token is replaced");
  })
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
