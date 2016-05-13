var capmetrics = require('../app.js');
var models = require('../models');
var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;

describe('daily-ridership endpoint tests', function(){

  beforeEach(function() {
    return models.sequelize.sync().then(function(){
      models.DailyRidership.create({'id':1, 'performance': 100});
      models.DailyRidership.create({'id':2, 'performance': 200});
    });
  });

  afterEach(function() {
    return models.DailyRidership.destroy({where: {id: [1, 2]}});
  });

  describe('GET DailyRidership model collection', function(){
    it('should return 200', function(done){
      request(capmetrics)
        .get('/daily-ridership')
        .expect(200, done)
    });

    it('should return JSON data', function(done){
      var app = capmetrics;
      request(capmetrics)
        .get('/daily-ridership')
        .expect(JSON.stringify({"data": 1}), done);
    });
  });

  describe('GET DailyRidership single model', function(){
    it('should return 200', function(done){
      request(capmetrics)
        .get('/daily-ridership/2')
        .expect(200, done)
    });

    it('should return a JSON API content-type', function(done){
      var app = capmetrics;
      request(capmetrics)
        .get('/daily-ridership/2')
        .expect('Content-Type', 'application/json', done);
    });

    it('should return JSON data', function(done){
      var app = capmetrics;
      request(capmetrics)
        .get('/daily-ridership/2')
        .expect(JSON.stringify({"data": 2}), done);
    });
  });

});
