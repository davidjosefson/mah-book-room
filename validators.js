var constants = require('./constants');

var validators = {};

validators.user = function(user) {
  if (user === null ||  user === undefined) {
    return new Error('No username was specified. \tExample use: [ -u myUsername ]');
  }
  return true;
}

validators.pass = function(pass) {
  if (pass === null || pass === undefined) {
    return new Error('No password was specified. \tExample use: [ -p myPassword ]');
  }
  return true;
}

validators.room = function(room)  {
  if (room === null || room === undefined) {
    return new Error('No room was specified. \t\tExample use: [ -r NI:A0506 ]');
  } else if (constants.ROOMS[room] === undefined) {
    return new Error('"' + room + '" is not a valid room. Example use: -r NI:0403');
  }

  return true;
}

validators.time = function(time) {
  if (time === null ||  time === undefined) {
    return new Error('No time was specified. \t\tExample use: [ -t 08 ]');
  } else if (constants.TIMES[time] === undefined) {
    return new Error('"' + time + '" is not a valid time, has to be one of the following: 08, 10, 13, 15, 17');
  }
  return true;
}

validators.date = function(date) {
  if (date === null || date === undefined) {
    return new Error('No date was specified. \t\tExample use: [ -d 15-09-27 ]');
  } else if (typeof date != 'string') {
    return new Error('Date was not a string');
  } else if (!date.match(/\b(\d{2})-(\d{2})-(\d{2})\b/))  {
    return new Error('"' + date + '" is not a valid date. Has to be in this format: YY-MM-DD');
  }
  return true;
}

module.exports = validators;
