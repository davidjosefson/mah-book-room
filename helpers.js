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

module.exports = helpers;
