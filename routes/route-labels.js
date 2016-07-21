'use strict';
/** @module routes/route-labels */
var models = require('../models');
var express = require('express');
var toDocument = require('../utils/to-document');

var router = express.Router();

var changeModelTypeName = function(doc) {
  if ('data' in doc) {
    for (let i = 0; i < doc.data.length; i++) {
      let resourceObj = doc.data[i];
      resourceObj.type = 'route-labels';
    }
  }
  return doc;
}

var handleCollection = function(models, res, next){
  models.Route
    .findAll({ attributes: ['id', 'routeNumber', 'routeName']})
    .then(function(routes) {
      if (routes) {
        let documentBuild = toDocument(routes, {'modelType': 'routes'} );
        documentBuild
          .then(function(jsonapiDoc) {
            res.type('application/vnd.api+json');
            res.json(changeModelTypeName(jsonapiDoc));
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

router.get('/', function(req, res, next) {
  handleCollection(models, res, next);
});

/**
 * Router for providing convenient route label JSON.
 *
 * Exports an Express Router instance with GET function for route label objects.
 *
 * | API Endpoint         | Available logic                           |
 * |----------------------|-------------------------------------------|
 * | /route-labels        | GET route label collection                |
 *
 */
module.exports = router;
