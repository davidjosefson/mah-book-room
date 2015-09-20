/*
TODO: fixa så att room och time går att hämta i nån sorts map, så att de kan printas snyggt och enkelt, eller bara nån getTime getRoom
TODO: refactora till tre filer: index, validators, constants
TODO: README
TODO: testning
*/

var request = require('request');
var fs = require('fs');
var http = require('http');
var commander = require('commander');
var constants = require('./constants');

// Saves cookies for each request and uses them for the next
var request = request.defaults({
  jar: true
});

commander
  .version('0.0.1')
  .option('-u, --user     <username>', 'username at MAH: [ ab1234 ]')
  .option('-p, --pass     <password>', 'password at MAH')
  .option('-r, --room     <room number>', 'which room number to book: [ NI:A0301 ]')
  .option('-d, --date     <date>', 'what date to book: [ 16-01-31 ]')
  .option('-t, --time     <time>', 'what time to book. Valid values: [ 08 ], [ 10 ], [ 13 ], [ 15 ], [ 17 ]');

commander.on('--help', function() {
  console.log('  Examples:');
  console.log('');
  console.log('    $ book -u ab1234 -p myPassword -r NI:C0405 -d 2015-09-19 -t 13');
  console.log('');
  console.log('    .. will book room NI:C0405 on September the 19th between 13.15-15.00');
  console.log('');
});

commander.parse(process.argv);

if (!validators.user(commander.user) ||
  !validators.pass(commander.pass) ||
  !validators.room(commander.room) ||
  !validators.date(commander.date) ||
  !validators.time(commander.time)
) {
  process.exit(1);
}

// book();


console.log('User: ', commander.user);
console.log('Pass: ', commander.pass);
console.log('Room: ', commander.room);
console.log('Date: ', commander.date);
console.log('Time: ', commander.time);

console.log('https://schema.mah.se/ajax/ajax_resursbokning.jsp?op=boka&datum=' + commander.date + '&id=' + commander.room + '&typ=RESURSER_LOKALER&intervall=' + commander.time + '&moment=&flik=FLIK-0017');
console.log('https://schema.mah.se/ajax/ajax_resursbokning.jsp?op=boka&datum=' + commander.date + '&id=' + constants.ROOMS[commander.room].urlRoom + '&typ=RESURSER_LOKALER&intervall=' + constants.TIMES[commander.time].urlTime + '&moment= &flik=FLIK-0017');
// console.log(commander.user);

function book() {
  request('https://schema.mah.se/resursbokning.jsp?flik=FLIK-0017', function(err, httpResponse1, body) {
    request({
      method: 'POST',
      url: 'https://schema.mah.se/login_do.jsp',
      form: {
        password: commander.pass,
        username: commander.user
      }
    }, function(err, httpResponse2, body) {
      if (!err) {
        request({
          url: 'https://schema.mah.se/ajax/ajax_resursbokning.jsp?op=boka&datum=' + commander.date + '&id=' + constants.ROOMS[commander.room] + '&typ=RESURSER_LOKALER&intervall=' + constants.TIMES[commander.time] + '&moment= &flik=FLIK-0017',
        }, function(err, httpResponse3, body) {
          if (!err) {
            if (body != 'OK') {
              console.log('The room was not booked, the following error was received from schema.mah.se: ');
              console.log(body);
            } else {
              console.log('Room ' + commander.room + ' was booked at ' + commander.date + ' ' + commander.timeText);
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
