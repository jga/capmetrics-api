'use strict';
/** @module routes/high-ridership */
var models = require('../models');
var express = require('express');

var router = express.Router();

router.get('/', function(req, res, next) {
  models.PerformanceDocument
    .findAll({ where: { name: 'top-routes' } })
    .then(function(performanceDocuments) {
      if (performanceDocuments[0]) {
        res.type('application/vnd.api+json');
        let highRidershipRoutes = JSON.parse(performanceDocuments[0].document);
        res.json(highRidershipRoutes);
      } else {
        res.json([]);
      }
    });
})

/**
 * Router for providing visualization-ready data for high ridership routes.
 *
 * Exports an Express Router instance with GET function for high ridership data.
 *
 * | API Endpoint         | Available logic                           |
 * |----------------------|-------------------------------------------|
 * | /high-ridership      | GET data series JSON                      |
 *
 */
module.exports = router;
