'use strict';
/**
 * @module routes/service-hour-riderships
 */
var models = require('../models');
var express = require('express');
var toDocument = require('../utils/to-document');

var router = express.Router();

var handleCollection = function(models, res, next) {
  models.ServiceHourRidership
    .findAll({ include: [{ model: models.Route }] })
    .then(function(riderships) {
      if (riderships) {
        let relationshipDirectives = {
          'modelType': 'service-hour-riderships',
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
  models.ServiceHourRidership
    .findOne({ where: { id: id }, include: [{ model: models.Route }] })
    .then(function(ridership) {
      res.type('application/vnd.api+json');
      if (ridership) {
        let relationshipDirectives = {
          'modelType': 'service-hour-riderships',
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
  handleCollection(models, res, next);
});

router.get('/:id', function(req, res, next) {
  handleSingle(models, req.params.id, res, next);
});

/**
 * Router for providing active **ServiceHourRidership** resources.
 *
 * Exports an Express Router instance with GET functions
 * for handling collection and single resource requests.
 *
 * Responses follow the JSON API specification.  Model data
 * is keyed to the `data` member of the JSON response.
 *
 * | API Endpoint                | Available logic                           |
 * |-----------------------------|-------------------------------------------|
 * | /service-hour-riderships    | GET resource collection                   |
 * | /service-hour-rirderships/1 | GET single resource by identifier         |
 */
module.exports = router;

