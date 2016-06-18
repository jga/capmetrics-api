'use strict';

var models = require('../models');
var utils = require('../utils');
var chai = require('chai');
var expect = chai.expect;
var fixtures = require('./fixtures/models')

describe('to-document utility function tests', function(){

  before(function() {
    // load fixtures - FYI: Sequelize is async
    return models.sequelize.sync().then(function() {
      models.Route.create(fixtures.route1).then(function(route) {
        let s1 = models.ServiceHourRidership.create(fixtures.productivity1);
        let s2 = models.ServiceHourRidership.create(fixtures.productivity2);
        let d1 = models.DailyRidership.create(fixtures.ridership1);
        let d2 = models.DailyRidership.create(fixtures.ridership2);
        let d3 = models.DailyRidership.create(fixtures.ridership3);
        Promise.all([s1, s2, d1, d2, d3]);
      });
    })
  });

  after(function() {
    // delete models for clean model store for each tests set
    return models.DailyRidership.destroy({where: {id: [1, 2, 3]}}).then(function(){
      models.ServiceHourRidership.destroy({where: {id: [1, 2]}}).then(function(){
        models.Route.destroy({ where: { id: 1 } });
      })
    });
  });

  describe('Prepare JSON API include member', function(){
    it('returns well-formed document from model with include', function(done) {
      models.Route.findAll(
        { where: {id: 1}, include: [models.DailyRidership, models.ServiceHourRidership]}
      ).then(function(routes) {
        let relationshipDirectives = {
          'included': {'DailyRiderships': ['Route'], 'ServiceHourRiderships': ['Route']},
          'db': models
        }
        let docPromise = utils.toDocument(routes[0], relationshipDirectives);
        docPromise.then(function(jsonapiDoc){
          expect(jsonapiDoc.data.attributes['route-number']).to.equal(101);
          let included = jsonapiDoc.included;
          expect(included.length).to.equal(5);
          let keyedIncluded = {}
          for (let i = 0; i < included.length; i++) {
            let model = included[i];
            let comboKey =  String(model.type + model.id);
            keyedIncluded[comboKey] = included[i];
          }
          expect(keyedIncluded['daily-riderships1'].attributes.ridership).to.equal(1234)
          expect(keyedIncluded['daily-riderships1'].relationships.route.id).to.equal(1)
          expect(keyedIncluded['daily-riderships1'].relationships.route.type).to.equal('route')
          done();
        }).catch(done);
      });
    });
  });

});

