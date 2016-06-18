'use strict';
/**
 * Routes for providing **DailyRidership** resources.
 *
 * Exports an Express Router instance with GET functions
 * for handling collection and single resource requests.
 *
 * Responses follow the JSON API specification.  Model data
 * is keyed to the `data` member of the JSON response.
 *
 * | API Endpoint         | Available logic                           |
 * |----------------------|-------------------------------------------|
 * | /daily-riderships    | GET resource collection                   |
 * | /daily-rirderships/1 | GET single resource by identifier         |
 *
 * @module routes/daily-riderships
 */
var models = require('../models');
var express = require('express');
var toDocument = require('../utils/to-document');

var router = express.Router();

var handleHighRidershipQuery = function(models, res, next) {
  models.DailyRidership
    .findAll({include: [{ model: models.Route, where: { isHighRidership: true } }]})
    .then(function(riderships) {
      if (riderships) {
        let relationshipDirectives = {
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

/**
 * Converts models into a JSON API response.
 *
 * The `included` key contains **Route** model(s) associated to
 * the returned **DailyRidership** models.
 *
 * @inner
 * @param {array} resources An array of Sequelize models.
 * @param {object} jsonApiResponse Represent a JSON API response.
 * @returns {object} The JSON API response object with model `data` and `included` keys.
 *
**/
var handleCollection = function(models, res, next) {
  models.DailyRidership
    .findAll({ include: [{ model: models.Route }] })
    .then(function(riderships) {
      if (riderships) {
        let relationshipDirectives = {
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
  // query not found, send collection
  } else {
    handleCollection(models, res, next);
  }
});

router.get('/:id', function(req, res, next) {
  handleSingle(models, req.params.id, res, next);
});

module.exports = router;
