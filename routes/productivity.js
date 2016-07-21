'use strict';
/** @module routes/productivity */
var models = require('../models');
var express = require('express');

var router = express.Router();

router.get('/', function(req, res, next) {
  models.PerformanceDocument
    .findOne({ where: { name: 'productivity' } })
    .then(function(performanceDocument) {
      if (performanceDocument) {
        res.type('application/vnd.api+json');
        let highRidershipRoutes = JSON.parse(performanceDocument.document);
        res.json(highRidershipRoutes);
      } else {
        res.json([]);
      }
    });
})

/**
 * Router for providing visualization-ready data for productivity analysis.
 *
 * Exports an Express Router instance with GET function for productivity data.
 *
 * | API Endpoint         | Available logic                           |
 * |----------------------|-------------------------------------------|
 * | /productivity        | GET data series JSON                      |
 *
 */
module.exports = router;
