'use strict';

var models = require('../models');
var express = require('express');

var router = express.Router();

router.get('/', function(req, res, next) {
  models.DailyRidership.findAll().then(function(riderships) {
    let firstRidership = riderships[0];
    res.type('application/vnd.api+json');
    res.json({'id': firstRidership.id, 'performance': firstRidership.performance})
  });
});

router.get('/:id(\\d+)', function(req, res, next) {
  models.DailyRidership.findById(parseInt(req.params.id)).then(function(ridership) {
    res.type('application/vnd.api+json');
    let data = {'id': ridership.id, 'performance': ridership.performance};
    res.json(data);
  });
});

module.exports = router;
