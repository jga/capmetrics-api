var capmetrics = require('../app.js');
var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;

describe('app', function(){
  it('should return 200', function(done){
    var app = capmetrics;
    request(app)
      .get('/')
      .expect(200, done)
  });

  it('should return welcome', function(done){
    var app = capmetrics;
    request(app)
      .get('/')
      .expect('Welcome to the app.', done);
  });
});
