/*
TODO: README
*/

var request = require('request');
var args = require('commander');
var constants = require('./constants');
var validators = require('./validators');

// Saves response cookies for each request and uses them for the next one
var request = request.defaults({
  jar: true
});

// Command line arguments and help text
args
  .version('0.0.1')
  .option('-u, --user     <username>', 'username at MAH: [ ab1234 ]')
  .option('-p, --pass     <password>', 'password at MAH')
  .option('-r, --room     <room number>', 'which room number to book: [ NI:A0301 ]')
  .option('-d, --date     <date>', 'what date to book: [ 16-01-31 ]')
  .option('-t, --time     <time>', 'what time to book. Valid values: [ 08 ], [ 10 ], [ 13 ], [ 15 ], [ 17 ]');

args.on('--help', function() {
  console.log('  Examples:');
  console.log('');
  console.log('    $ book -u ab1234 -p myPassword -r NI:C0405 -d 15-09-19 -t 13');
  // console.log('');
  console.log('    .. will book room NI:C0405 on September the 19th between 13.15-15.00');
  console.log('');
});

args.parse(process.argv);

// Prints help if no arguments was used
if (!process.argv.slice(2).length) {
  args.outputHelp();
  process.exit(1);
}

// Validates command line arguments
if (!validators.user(args.user) ||
  !validators.pass(args.pass) ||
  !validators.room(args.room) ||
  !validators.date(args.date) ||
  !validators.time(args.time)
) {
  process.exit(1);
}

// Books a room
book(createBookingUrl(), args.pass, args.user);

function createBookingUrl() {
  var bookingUrl = 'https://schema.mah.se/ajax/ajax_resursbokning.jsp?op=boka&typ=RESURSER_LOKALER&flik=FLIK-0017&moment= ';
  bookingUrl += '&datum=' + args.date;
  bookingUrl += '&id=' + constants.ROOMS[args.room].urlRoom;
  bookingUrl += '&intervall=' + constants.TIMES[args.time].urlTime;

  console.log(bookingUrl);

  return bookingUrl;
}

function book(bookingUrl, password, username) {
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
