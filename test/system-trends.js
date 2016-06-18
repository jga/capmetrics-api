'use strict';

var capmetrics = require('../app.js');
var models = require('../models');
var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;
var fixtures = require('./fixtures/models')

describe('system-trend endpoint tests', function() {

  before(function() {
    return models.sequelize.sync().then(function() {
        let t1 = models.SystemTrend.create(fixtures.trend1);
        let t2 = models.SystemTrend.create(fixtures.trend2);
        let t3 = models.SystemTrend.create(fixtures.trend3);
        let t4 = models.SystemTrend.create(fixtures.trend4);
        let t5 = models.SystemTrend.create(fixtures.trend5);
        Promise.all([t1, t2, t3, t4, t5]);
    })
  });

  after(function() {
    // delete models for clean model store for each tests set
    return models.SystemTrend.destroy({where: {id: [1, 2, 3, 4, 5]}})
  });

  describe('GET system-trend collection', function() {
    it('returns expected count of resources', function(done) {
      let app = capmetrics;
      request(capmetrics)
        .get('/system-trends')
        .expect(function(res) {
          expect(res.body.data.length).to.equal(5)
        })
        .end(done)
    });

    it('returns trend field as JSON', function(done) {
      let app = capmetrics;
      request(capmetrics)
        .get('/system-trends')
        .expect(function(res) {
          expect(res.body.data[0].id).to.equal(1);
          expect(JSON.parse(res.body.data[0].attributes.trend).length).to.equal(6);
          let trend1 = JSON.parse(res.body.data[0].attributes.trend)[0]
          expect(parseInt(trend1[1])).to.equal(parseInt(34991.72689950951))
        })
        .end(done)
    });
  });
});
