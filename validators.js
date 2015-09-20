var constants = require('./constants');

var validators = {};

validators.user(user) {
  if (user === undefined) {
    console.log('No username was specified.');
    return false;
  }
  return true;
}

validators.pass(pass) {
  if (pass === undefined) {
    console.log('No password was specified.');
    return false;
  }
  return true;
}

validators.room(room)  {
  if (room === undefined) {
    console.log("No room was specified");
    return false;
  } else if (constants.ROOMS[room] != undefined) {
    console.log('"' + room + '" is not a valid room');
    return false;
  }
  return true;
}

validators.time(time) {
  if (time === undefined) {
    console.log("No time was specified");
    return false;
  } else if (constants.TIMES[time] != undefined) {
    console.log('"' + time + '" is not a valid time');
    return false;
  }
  return true;
}

validators.date(date) {
  if (date === undefined) {
    console.log("No date was specified");
    return false;
  } else if (!date.match(/\b(\d{2})-(\d{2})-(\d{2})\b/))  {
    console.log('"' + date + '" is not a valid date. Has to be in this format: YY-MM-DD');
    return false;
  }
  return true;
}

module.exports = validators;
