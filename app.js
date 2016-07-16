var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var highRidershipRoutes = require('./routes/high-ridership')
var transitRoutesRoutes = require('./routes/routes');
var routeLabelsRoutes = require('./routes/route-labels');
var productivityRoutes = require('./routes/productivity');
var systemTrendsRoutes = require('./routes/system-trends');
var dailyRidershipRoutes = require('./routes/daily-riderships');
var serviceHourRidershipRoutes = require('./routes/service-hour-riderships');

var app = express();
var corsOptions = {
  options: { origin: ['localhost', 'capmetrics.org'] }
}
app.use(cors(corsOptions));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/daily-riderships', dailyRidershipRoutes);
app.use('/high-ridership', highRidershipRoutes);
app.use('/routes', transitRoutesRoutes);
app.use('/productivity', productivityRoutes);
app.use('/route-labels', routeLabelsRoutes);
app.use('/service-hour-riderships', serviceHourRidershipRoutes);
app.use('/system-trends', systemTrendsRoutes);

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
