'use strict';
/** @module routes/system-trends */
var models = require('../models');
var express = require('express');
var toDocument = require('../utils/to-document');

var router = express.Router();

var handleDirectQuery = function(models, res, next) {
  models.SystemTrend
    .findAll()
    .then(function(systemTrends) {
      if (systemTrends) {
        let documentBuild = toDocument(systemTrends, {'modelType': 'system-trends'});
        documentBuild
          .then(function(jsonapiDoc) {
            res.type('application/vnd.api+json');
            res.json(jsonapiDoc);
          })
          .catch(function(error) { next(error) })
      } else {
        res.json({'data': []});
      }
    })
    .catch(function(error) {
      next(error);
    })
}

var handleCollection = function (models, res, next) {
  models.PerformanceDocument
    .findAll({ where: { name: 'system-trends' } })
    .then(function(performanceDocuments) {
      if (performanceDocuments[0]) {
        res.type('application/vnd.api+json');
        let jsonapiDoc = JSON.parse(performanceDocuments[0].document);
        res.json(jsonapiDoc);
      } else {
        res.json({'data': []});
      }
    });
}

router.get('/', function(req, res, next) {
  // check for performance mode to be set to off
  if ('performance' in req.query && req.query.performance === 'off') {
    handleDirectQuery(models, res, next);
  // query not found, send to high performance handler
  } else {
    handleCollection(models, res, next);
  }
});

/**
 * Router for providing visualization-ready data for system trend chart.
 *
 * Exports an Express Router instance with GET function for system trend chart.
 *
 * | API Endpoint         | Available logic                           |
 * |----------------------|-------------------------------------------|
 * | /system-trends       | GET data series                           |
 */
module.exports = router;
