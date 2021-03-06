'use strict';
/** @module routes/routes */

var models = require('../models');
var express = require('express');
var toDocument = require('../utils/to-document');

var router = express.Router();

var handleFilterWithDirectQuery = function(models, filter, res, next){
  models.Route
    .findAll(
      {
        where: {routeNumber: filter['route-number']},
        include: [models.DailyRidership, models.ServiceHourRidership]
      }
    )
    .then(function(routes) {
      res.type('application/vnd.api+json');
      if (routes){
        let relationshipDirectives = {
          'modelType': 'routes',
          'included': {'DailyRiderships': ['Route'], 'ServiceHourRiderships': ['Route']},
          'db': models
        }
        let documentBuild = toDocument(routes[0], relationshipDirectives);
        documentBuild
          .then(function(jsonapiDoc){
            res.type('application/vnd.api+json');
            res.json(jsonapiDoc);
          })
          .catch(function(error) { next(error) })
      } else {
        // null over [] because request client expects a single resource
        res.json({'data': null});
      }
    })
    .catch(function(error) {
      next(error);
    })
}

var handleFilter = function(models, filter, res, next) {
  let name = 'route-' + filter['route-number']
  models.PerformanceDocument
    .findAll({ where: { name: name } })
    .then(function(performanceDocuments) {
      if (performanceDocuments[0]) {
        res.type('application/vnd.api+json');
        let jsonapiDoc = JSON.parse(performanceDocuments[0].document);
        res.json(jsonapiDoc);
      } else {
        res.json({'data': null});
      }
    });
}

var collectionPrefetchQueryOptions = { include: [
    { model: models.DailyRidership, separate: false },
    { model: models.ServiceHourRidership, separate: false }
  ]
}

var handleCollection = function(models, res, next){
  models.Route
    .findAll(collectionPrefetchQueryOptions)
    .then(function(routes) {
      if (routes) {
        let relationshipDirectives = {
          'modelType': 'routes',
          'pk': {'DailyRiderships': null, 'ServiceHourRiderships': null},
          'db': models
        }
        let documentBuild = toDocument(routes, relationshipDirectives);
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

var handleSingle = function(models, id, res, next){
  models.Route
    .findAll(
      {
        where: {id: id},
        include: [models.DailyRidership, models.ServiceHourRidership]
      }
    )
    .then(function(routes) {
      res.type('application/vnd.api+json');
      if (routes){
        let relationshipDirectives = {
          'modelType': 'routes',
          'included': {
            'DailyRiderships': ['Route'],
            'ServiceHourRiderships': ['Route']
          },
          'db': models
        }
        let documentBuild = toDocument(routes[0], relationshipDirectives);
        documentBuild
          .then(function(jsonapiDoc){
            res.type('application/vnd.api+json');
            res.json(jsonapiDoc);
          })
          .catch(function(error) { next(error) })
      } else {
        // null over [] because request client expects a single resource
        res.json({'data': null});
      }
    })
    .catch(function(error) {
      next(error);
    })
}

router.get('/', function(req, res, next) {
  let filter = req.query.filter;
  // check for route-number filter
  if (filter && filter['route-number']) {
    if ('performance' in req.query && req.query.performance === 'off'){
      handleFilterWithDirectQuery(models, filter, res, next);
    } else {
      handleFilter(models, filter, res, next);
    }
  // filter not found, send collection
  } else {
    handleCollection(models, res, next);
  }
});

router.get('/:id', function(req, res, next) {
  handleSingle(models, req.params.id, res, next);
});

/**
 * Router for providing **Route** resources.
 *
 * Exports an Express Router instance with GET functions
 * for handling collection and single resource requests.
 *
 * Additionally, there is hard-wired logic for handling a
 * 'filter' query string for the `route-number` field. Other
 * query string parameters are not handled.
 *
 * Responses follow the JSON API specification.  Model data
 * is keyed to the `data` member of the JSON response.
 *
 * | API Endpoint         | Available logic                           |
 * |----------------------|-------------------------------------------|
 * | /routes              | GET resource collection                   |
 * | /routes/1            | GET single resource by identifier         |
 */
module.exports = router;
