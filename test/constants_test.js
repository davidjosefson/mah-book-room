var expect = require('chai').expect;
var constants = require('../constants');

describe('Testing the constants', function()  { 
  describe('Testing that TIMES and ROOMS objects exists', function() {
    it('should have an object called TIMES', function() {
      expect(constants).to.have.property('TIMES').that.is.an('object');
    });
    it('should have an object called ROOMS', function() {
      expect(constants).to.have.property('ROOMS').that.is.an('object');
    });
  });

  describe('Testing that a few selected objects exists in TIMES and that they have correct properties', function() {
    it('should have an object called "08" that should have properties readableTime and urlTime', function() {
      expect(constants.TIMES).to.have.property('08').that.is.an('object').with.property('readableTime').that.equals('08:15-10:00');
      expect(constants.TIMES).to.have.property('08').that.is.an('object').with.property('urlTime').that.equals(0);
    });
    it('should have an object called "17" that should have properties readableTime and urlTime', function() {
      expect(constants.TIMES).to.have.property('17').that.is.an('object').with.property('readableTime').that.equals('17:15-20:00');
      expect(constants.TIMES).to.have.property('17').that.is.an('object').with.property('urlTime').that.equals(4);
    });
  });

  describe('Testing that a few selected objects exists in ROOMS and that they have correct properties', function() {
    it('should have an object called "NI:A0506" that should have property urlRoom', function() {
      expect(constants.ROOMS).to.have.property('NI:A0506').that.is.an('object').with.property('urlRoom').that.equals('NI%3AA0506');
    });
    it('should have an object called "NI:C0401" that should have property urlRoom', function() {
      expect(constants.ROOMS).to.have.property('NI:C0401').that.is.an('object').with.property('urlRoom').that.equals('NI%3AC0401');
    });
  });
});
