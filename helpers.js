var constants = require('./constants');

var helpers = {};

helpers.createDateString = function(dateAsWord)  {
  var date;
  var today = new Date();

  var tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  if (dateAsWord === 'today') {
    date = today.toISOString().substr(2, 8);
    return date;
  } else if (dateAsWord === 'tomorrow') {
    date = tomorrow.toISOString().substr(2, 8);
    return date;
  }

  return dateAsWord;
}

helpers.createBookingUrl = function(date, time, room) {
  var formattedDate = helpers.createDateString(date);
  var formattedTime = constants.TIMES[time].urlTime;
  var formattedRoom = constants.ROOMS[room].urlRoom;

  var bookingUrl = 'https://schema.mah.se/ajax/ajax_resursbokning.jsp?op=boka&typ=RESURSER_LOKALER&flik=FLIK-0017&moment= ';
  bookingUrl += '&datum=' + formattedDate;
  bookingUrl += '&id=' + formattedRoom;
  bookingUrl += '&intervall=' + formattedTime;

  return bookingUrl;
}

module.exports = helpers;
