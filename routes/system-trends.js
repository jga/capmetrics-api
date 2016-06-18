'use strict';

var models = require('../models');
var express = require('express');
var toDocument = require('../utils/to-document');

var router = express.Router();

router.get('/', function(req, res, next) {
  models.SystemTrend
    .findAll()
    .then(function(systemTrends) {
      if (systemTrends) {
        let documentBuild = toDocument(systemTrends, null);
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
});

module.exports = router;
