var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routesHandler = require('./routes/routes');
var systemTrendsRoutes = require('./routes/system-trends');
var dailyRidershipRoutes = require('./routes/daily-riderships');
var serviceHourRidershipRoutes = require('./routes/service-hour-riderships');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/routes', routesHandler);
app.use('/system-trends', systemTrendsRoutes);
app.use('/daily-riderships', dailyRidershipRoutes);
app.use('/service-hour-riderships', serviceHourRidershipRoutes);

// catch 404 for a request without a resource route
// and forward to error handler
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
    var statusCode = err.status || 500;
    res.status(statusCode);
    var jsonapiError = {
      'status': new String(statusCode),
      'detail': err.message
    }
    var errors = [jsonapiError];
    res.json({ 'errors': errors });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  var statusCode = err.status || 500;
  res.status(statusCode);
  var jsonapiError = {
    'status': new String(statusCode),
    'detail': err.message
  }
  var errors = [jsonapiError];
  res.json({ 'errors': errors });
});


module.exports = app;
