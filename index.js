#! /usr/bin/env node

var request = require('request');
var args = require('commander');
var constants = require('./constants');
var validators = require('./validators');
var helpers = require('./helpers');

// Saves response cookies for each request and uses them for the next one
var request = request.defaults({
  jar: true
});

// Command line arguments and help text
args
  .version('0.2.0')
  .option('-u, --user     <username>', 'username at MAH')
  .option('-p, --pass     <password>', 'password at MAH')
  .option('-r, --room     <room number>', 'which room number to book, example: [ NI:A0301 ]')
  .option('-d, --date     <date>', 'what date to book, example: [ 16-01-31 ], [ today ] or [ tomorrow ]')
  .option('-t, --time     <time>', 'what time to book. Valid values: [ 08 ], [ 10 ], [ 13 ], [ 15 ], [ 17 ]');

args.on('--help', function() {
  console.log('  Examples:');
  console.log('');
  console.log('    $ mah-book-room -u ab1234 -p myPassword -d tomorrow -t 13 -r NI:C0405');
  console.log('    .. will book room NI:C0405 for tomorrow between 13.15-15.00');
  console.log('');
});

args.parse(process.argv);

// Prints the help and exits the program if no arguments was used
if (!process.argv.slice(2).length) {
  args.outputHelp();
  process.exit(1);
}

// Validate the command line arguments
if (!validateArguments()) {
  process.exit(1);
}

// Create booking url
var bookingUrl = helpers.createBookingUrl(args.date, args.time, args.room);

// Book the room
bookRoom(bookingUrl, args.pass, args.user);

function bookRoom(bookingUrl, password, username) {
  request('https://schema.mah.se/resursbokning.jsp?flik=FLIK-0017', function(err, httpResponse1, body) {
    request({
      method: 'POST',
      url: 'https://schema.mah.se/login_do.jsp',
      form: {
        password: password,
        username: username
      }
    }, function(err, httpResponse2, body) {
      if (!err) {
        request({
          url: bookingUrl,
        }, function(err, httpResponse3, body) {
          if (!err) {
            if (body != 'OK') {
              console.log('\nThe room was not booked, the following error was received from schema.mah.se: ');
              console.log('\n\t' + body + '\n');
            } else {
              console.log('Room ' + args.room + ' was booked at ' + args.date + ' ' + constants.TIMES[args.time].readableTime);
            }
          } else {
            console.log('GET for https://schema.mah.se/ajax/ajax_resursbokning.jsp?.. failed: ', err);
          }
        });
      } else {
        console.log('POST for https://schema.mah.se/login_do.jsp.. failed: ', err);
      }
    });
  });
}

/**
  Runs validators for all required arguments and prints errors if there are any
**/
function validateArguments() {
  var allPassed = true;

  var userResult = validators.user(args.user);
  var passResult = validators.pass(args.pass);
  var roomResult = validators.room(args.room);
  var dateResult = validators.date(args.date);
  var timeResult = validators.time(args.time);

  if (userResult instanceof Error) {
    console.log(userResult.toString());
    allPassed = false;
  }
  if (passResult instanceof Error) {
    console.log(passResult.toString());
    allPassed = false;
  }
  if (roomResult instanceof Error) {
    console.log(roomResult.toString());
    allPassed = false;
  }
  if (dateResult instanceof Error) {
    console.log(dateResult.toString());
    allPassed = false;
  }
  if (timeResult instanceof Error) {
    console.log(timeResult.toString());
    allPassed = false;
  }

  return allPassed;
}
