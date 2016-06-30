'use strict';

var capmetrics = require('../app.js');
var models = require('../models');
var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;
var fixtures = require('./fixtures/models')
var expectedResponses = require('./fixtures/responses')

describe('routes endpoint tests', function() {

  before(function() {
    // load fixtures - FYI: Sequelize is async
    return models.sequelize.sync().then(function() {
        let r1 = models.Route.create(fixtures.route1);
        let r2 = models.Route.create(fixtures.route2);
        Promise.all([r1, r2]).then(function(route) {
          let s1 = models.ServiceHourRidership.create(fixtures.productivity1);
          let s2 = models.ServiceHourRidership.create(fixtures.productivity2);
          let s3 = models.ServiceHourRidership.create(fixtures.productivity1_2);
          let s4 = models.ServiceHourRidership.create(fixtures.productivity2_2);
          let d1 = models.DailyRidership.create(fixtures.ridership1);
          let d2 = models.DailyRidership.create(fixtures.ridership2);
          let d3 = models.DailyRidership.create(fixtures.ridership3);
          let d4 = models.DailyRidership.create(fixtures.ridership1_2);
          let d5 = models.DailyRidership.create(fixtures.ridership2_2);
          let d6 = models.DailyRidership.create(fixtures.ridership3_2);
          Promise.all([s1, s2, s3, s4, d1, d2, d3, d4, d5, d6]);
      });
    })
  });

  after(function() {
    // delete models for clean model store for each tests set
    return models.DailyRidership.destroy({where: {id: [1, 2, 3, 4, 5, 6]}}).then(function(){
      models.ServiceHourRidership.destroy({where: {id: [1, 2, 3, 4]}}).then(function(){
        models.Route.destroy({ where: { id: [1, 2] } });
      })
    });
  });

  describe('Filter routes by route-number', function() {
    it('returns JSON API document', function (done){
      let app = capmetrics;
      request(capmetrics)
        .get('/routes')
        .query('filter[route-number]=101')
        .query('performance=off')
        .expect(function(res) {
          expect(res.body.data.id).to.equal('1')
        })
        .end(done)
    });
  });

  describe('GET single route by id with included', function() {
    it('returns JSON API document', function (done){
      let app = capmetrics;
      request(capmetrics)
        .get('/routes/2')
        .expect(function(res) {
          expect(res.body.data.id).to.equal('2')
          expect(res.body.included.length).to.equal(5)
        })
        .end(done)
    });
  });

  describe('GET route collection with relationships', function() {
    it('returns expected count of resources', function (done){
      let app = capmetrics;
      request(capmetrics)
        .get('/routes')
        .query('performance=off')
        .expect(function(res) {
          expect(res.body.data.length).to.equal(2)
          expect(res.body.data[0].relationships['daily-riderships'].data.length).to.equal(3)
        })
        .end(done)
    });
  });
});
