var expect = require('chai').expect;
var validators = require('../validators');

describe('Testing the validators', function()  {

  describe('Testing the username validator', function() {
    it('should return false if input is null', function()  {
      expect(validators.user(null)).to.be.an.instanceof(Error);
    });
    it('should return false if input is undefined', function()  {
      expect(validators.user(undefined)).to.be.an.instanceof(Error);
    });
    it('should return false if input is empty', function()  {
      expect(validators.user()).to.be.an.instanceof(Error);
    });
    it('should return true if input is a string', function()  {
      expect(validators.user("myusername")).to.equal(true);
    });
  });

  describe('Testing the password validator', function() {
    it('should return false if input is null', function()  {
      expect(validators.pass(null)).to.be.an.instanceof(Error);
    });
    it('should return false if input is undefined', function()  {
      expect(validators.pass(undefined)).to.be.an.instanceof(Error);
    });
    it('should return false if input is empty', function()  {
      expect(validators.pass()).to.be.an.instanceof(Error);
    });
    it('should return true if input is a string', function()  {
      expect(validators.pass("mypassword")).to.equal(true);
    });
  });

  describe('Testing the room validator', function() {
    it('should return false if input is null', function()  {
      expect(validators.room(null)).to.be.an.instanceof(Error);
    });
    it('should return false if input is undefined', function()  {
      expect(validators.room(undefined)).to.be.an.instanceof(Error);
    });
    it('should return false if input is empty', function()  {
      expect(validators.room()).to.be.an.instanceof(Error);
    });
    it('should return false if input formatted correctly but not listed in constants.ROOMS', function()  {
      expect(validators.room("NI:A0909")).to.be.an.instanceof(Error);
    });
    it('should return false if input is formatted as the urlRoom', function()  {
      expect(validators.room("NI%3AA0506")).to.be.an.instanceof(Error);
    });
    it('should return true if input is listed in constants.ROOMS', function()  {
      expect(validators.room("NI:A0506")).to.equal(true);
    });
  });

  describe('Testing the time validator', function() {
    it('should return false if input is null', function()  {
      expect(validators.time(null)).to.be.an.instanceof(Error);
    });
    it('should return false if input is undefined', function()  {
      expect(validators.time(undefined)).to.be.an.instanceof(Error);
    });
    it('should return false if input is empty', function()  {
      expect(validators.time()).to.be.an.instanceof(Error);
    });
    it('should return false if input formatted correctly but not listed in constants.TIMES', function()  {
      expect(validators.time("07")).to.be.an.instanceof(Error);
    });
    it('should return false if input is formatted as the urlTime', function()  {
      expect(validators.time(1)).to.be.an.instanceof(Error);
    });
    it('should return true if input is listed in constants.TIMES', function()  {
      expect(validators.time("08")).to.equal(true);
    });
  });

  describe('Testing the date validator', function() {
    it('should return false if input is null', function()  {
      expect(validators.date(null)).to.be.an.instanceof(Error);
    });
    it('should return false if input is undefined', function()  {
      expect(validators.date(undefined)).to.be.an.instanceof(Error);
    });
    it('should return false if input is empty', function()  {
      expect(validators.date()).to.be.an.instanceof(Error);
    });
    it('should return false if input in the wrong format (YYYY-MM-DD)', function()  {
      expect(validators.date("2015-10-31")).to.be.an.instanceof(Error);
    });
    it('should return false if input is in wrong format (DDMMYY)', function()  {
      expect(validators.date("311015")).to.be.an.instanceof(Error);
    });
    it('should return false if input is an int', function()  {
      expect(validators.date(151224)).to.be.an.instanceof(Error);
    });
    it('should return true if input correctly formatted', function()  {
      expect(validators.date("16-05-26")).to.equal(true);
    });
  });
});
