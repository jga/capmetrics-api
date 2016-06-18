'use strict';

var capmetrics = require('../app.js');
var models = require('../models');
var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;
var fixtures = require('./fixtures/models')

describe('daily-ridership endpoint tests', function(){

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

  describe('GET single daily-ridership by id', function(){
    it('returns 200', function(done){
      request(capmetrics)
        .get('/daily-riderships/2')
        .expect(200, done)
    });

    it('returns JSON API document', function(done) {
      let app = capmetrics;
      request(capmetrics)
        .get('/daily-riderships/4')
        .expect(function(res) {
          expect(res.body.data.id).to.equal(4)
          expect(res.body.data.relationships.route.id).to.equal(2)
        })
        .end(done);
    });
  });

  describe('GET daily-ridership collection', function(){
    it('returns 200', function(done){
      request(capmetrics)
        .get('/daily-riderships')
        .expect(200, done)
    });

    it('returns list of all resources', function(done) {
      let app = capmetrics;
      request(capmetrics)
        .get('/daily-riderships')
        .expect(function(res) {
          expect(res.body.data.length).to.equal(6)
          expect(res.body.data[0].relationships.route.id).to.equal(1)
        })
        .end(done);
    });

    it('handles high-ridership query string', function(done) {
      let app = capmetrics;
      request(capmetrics)
        .get('/daily-riderships')
        .query('high-ridership=true')
        .expect(function(res) {
          expect(res.body.data.length).to.equal(3)
          expect(res.body.data[0].relationships.route.id).to.equal(1)
        })
        .end(done);
    });
  });

});

