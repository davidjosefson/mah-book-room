var expect = require('chai').expect;
var helpers = require('../helpers');

describe('Testing the helpers-file', function()  { 
  describe('Testing the createDateString()-function', function() {
    var today;
    var tomorrow;

    before(function() {
      today = new Date();
      tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
    });

    it('should return the date as is if formatted as YY-MM-DD', function() {
      expect(helpers.createDateString('15-10-31')).to.equal('15-10-31');
    });
    it('should return a string with format YY-MM-DD if input is "today"', function() {
      expect(helpers.createDateString('today')).to.match(/\b(\d{2})-(\d{2})-(\d{2})\b/);
    });
    it('should return a string with format YY-MM-DD if input is "tomorrow"', function() {
      expect(helpers.createDateString('tomorrow')).to.match(/\b(\d{2})-(\d{2})-(\d{2})\b/);
    });
    it('should return todays date as YY-MM-DD if input is "today"', function() {
      var correctDateString = today.toISOString().substring(2, 10);
      expect(helpers.createDateString('today')).to.equal(correctDateString);
    });
    it('should return tomorrows date as YY-MM-DD if input is "tomorrow"', function() {
      var correctDateString = tomorrow.toISOString().substring(2, 10);
      expect(helpers.createDateString('tomorrow')).to.equal(correctDateString);
    });
    it('should return two different strings if input is "today" and "tomorrow"', function() {
      expect(helpers.createDateString('today')).not.to.equal(helpers.createDateString('tomorrow'));
    });
  });

  describe('Testing the createBookingUrl()-function', function() {
    it('should return a correct url to use for booking if all parameters are correct', function() {
      expect(helpers.createBookingUrl('15-10-31', '08', 'NI:A0506')).to.equal('https://schema.mah.se/ajax/ajax_resursbokning.jsp?op=boka&typ=RESURSER_LOKALER&flik=FLIK-0017&moment= &datum=15-10-31&id=NI%3AA0506&intervall=0');
    });
  });
});
