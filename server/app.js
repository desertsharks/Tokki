var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// Routers
var guestRouter = express.Router();
var hostRouter = express.Router();

app.use(favicon(__dirname + '/../public/client/assets/favicon.png'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public/client')));

// Routes
app.get('/', function(req, res, next) {
  res.sendFile('/index.html');
});

app.use('/guest', guestRouter);
app.use('/host', hostRouter);

require('./routers/guestRouter')(guestRouter);
require('./routers/hostRouter')(hostRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Production error handler
// No stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
});

module.exports = app;
