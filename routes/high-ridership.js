'use strict';

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

module.exports = router;
