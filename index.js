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

// Saves cookies for each request and uses them for the next
var request = request.defaults({
  jar: true
});

var TIMES = ['08', '10', '13', '15', '17'];
var ROOMS = [
  'NI:A0301',
  'NI:A0302',
  'NI:A0303',
  'NI:A0309',
  'NI:A0401',
  'NI:A0402',
  'NI:A0403',
  'NI:A0409',
  'NI:A0506',
  'NI:A0605',
  'NI:B0201',
  'NI:B0301',
  'NI:B0302',
  'NI:B0306',
  'NI:C0201',
  'NI:C0301',
  'NI:C0302',
  'NI:C0303',
  'NI:C0304',
  'NI:C0305',
  'NI:C0308',
  'NI:C0401'
];

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

validateUserAndPass(commander.user, commander.pass);
validateAndFixRoom(commander.room);
validateDate(commander.date);
validateAndFixTime(commander.time);

book();

function validateUserAndPass(user, pass) {
  var valid = true;

  if (user === undefined)  {
    console.log('Username must be specified.');
    valid = false;
  }
  if (pass === undefined) {
    console.log('Password must be specified');
    valid = false;
  }

  if (!valid) {
    process.exit(1);
  }
}

function validateAndFixRoom()  {
  var valid = false;

  if (commander.room === undefined) {
    console.log("No room was specified");
    process.exit(1);
  } else {
    var exist = false;
    for (var i = 0; i < ROOMS.length; i++) {
      if (ROOMS[i] === commander.room) {
        commander.room = commander.room.replace(':', '%3A');
        exist = true;
      }
    }

    if (!exist) {
      console.log('"' + commander.room + '" is not a valid room');
      process.exit(1);
    }
  }
}

function validateAndFixTime() {
  var valid = false;

  if (commander.time === undefined) {
    console.log("No time was specified");
    process.exit(1);
  } else {
    var exist = false;
    for (var i = 0; i < TIMES.length; i++) {
      if (TIMES[i] === commander.time) {
        commander.timeText = commander.time;
        commander.time = i;
        exist = true;
      }
    }

    if (!exist) {
      console.log('"' + commander.time + '" is not a valid time');
      process.exit(1);
    }
  }
}

function validateDate(date) {
  if (date === undefined) {
    console.log("No date was specified");
    process.exit(1);
  } else if (!date.match(/\b(\d{2})-(\d{2})-(\d{2})\b/))  {
    console.log('"' + date + '" is not a valid date. Has to be in this format: YY-MM-DD');
    process.exit(1);
  }
}

console.log('User: ', commander.user);
console.log('Pass: ', commander.pass);
console.log('Room: ', commander.room);
console.log('Date: ', commander.date);
console.log('Time: ', commander.time);

console.log('https://schema.mah.se/ajax/ajax_resursbokning.jsp?op=boka&datum=' + commander.date + '&id=' + commander.room + '&typ=RESURSER_LOKALER&intervall=' + commander.time + '&moment=&flik=FLIK-0017');
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
          url: 'https://schema.mah.se/ajax/ajax_resursbokning.jsp?op=boka&datum=' + commander.date + '&id=' + commander.room + '&typ=RESURSER_LOKALER&intervall=' + commander.time + '&moment= &flik=FLIK-0017',
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
