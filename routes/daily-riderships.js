'use strict';
/**
 * @module routes/daily-riderships
 */
var models = require('../models');
var express = require('express');
var toDocument = require('../utils/to-document');

var router = express.Router();

var handleHighRidershipQuery = function(models, res, next) {
  models.DailyRidership
    .findAll({include: [{ model: models.Route, where: { isHighRidership: true }}] })
    .then(function(riderships) {
      if (riderships) {
        let relationshipDirectives = {
          'modelType': 'daily-riderships',
          'pk': {'Route': null},
          'db': models
        }
        let documentBuild = toDocument(riderships, relationshipDirectives);
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

var handleSparklines = function(models, res, next) {
  models.PerformanceDocument
    .findAll({ where: { name: 'ridership-sparklines' } })
    .then(function(performanceDocuments) {
      if (performanceDocuments[0]) {
        res.type('application/vnd.api+json');
        let highRidershipRoutes = JSON.parse(performanceDocuments[0].document);
        res.json(highRidershipRoutes);
      } else {
        res.json([]);
      }
    })
    .catch(function(error) {
      next(error);
    })
}

var handleCollection = function(models, res, next) {
  models.DailyRidership
    .findAll({ include: [{ model: models.Route }] })
    .then(function(riderships) {
      if (riderships) {
        let relationshipDirectives = {
          'modelType': 'daily-riderships',
          'pk': {'Route': null},
          'db': models
        }
        let documentBuild = toDocument(riderships, relationshipDirectives);
        documentBuild
          .then(function(jsonapiDoc){
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

var handleSingle = function(models, id, res, next) {
  models.DailyRidership
    .findOne({ where: { id: id }, include: [{ model: models.Route }] })
    .then(function(ridership) {
      res.type('application/vnd.api+json');
      if (ridership) {
        let relationshipDirectives = {
          'modelType': 'daily-riderships',
          'pk': {'Route': null},
          'db': models
        }
        let documentBuild = toDocument(ridership, relationshipDirectives);
        documentBuild
          .then(function(jsonapiDoc){
            res.type('application/vnd.api+json');
            res.json(jsonapiDoc);
          })
          .catch(function(error) { next(error) })
      } else {
        res.json({'data': null});
      }
    })
    .catch(function(error) {
      next(error);
    })
}

router.get('/', function(req, res, next) {
  // check for high-ridership query string
  if ('high-ridership' in req.query) {
    handleHighRidershipQuery(models, res, next);
  // check for sparkline data request
  } else if ('sparkline' in req.query){
    handleSparklines(models, res, next);
  // query not found, send collection
  } else {
    handleCollection(models, res, next);
  }
});

router.get('/:id', function(req, res, next) {
  handleSingle(models, req.params.id, res, next);
});

/**
 * Router for providing active **DailyRidership** resources.
 *
 * Exports an Express Router instance with GET functions
 * for handling collection and single resource requests.
 *
 * | API Endpoint         | Available logic                           |
 * |----------------------|-------------------------------------------|
 * | /daily-riderships    | GET resource collection                   |
 * | /daily-rirderships/1 | GET single resource by identifier         |
 *
 * The collection endpoint accepts `high-ridership` or `sparkline` as query paramaters
 * that return a custom format targeting the Capmetrics Web application client.
 */
module.exports = router;
