# mah-book-room
[![npm version](https://badge.fury.io/js/mah-book-room.svg)](http://badge.fury.io/js/mah-book-room)

A simple CLI-tool to let you book group rooms at the building Niagara on Malmö Högskola.

## Installation
```
$ npm install --global mah-book-room
```

## Usage
```
$ mah-book-room -u <username> -p <password> -d <date> -t <time> -r <room>
```

#### -u, --user
Username for Kronox and all other MAH web services.

#### -p, --pass
Password for Kronox and all other MAH web services.

#### -d, --date
Must be the words `today`, `tomorrow` or a date formatted like this: `15-10-31` ( YY-MM-DD ).

#### -t, --time
Must be one of the following valid values:

- `08` will book **08:15 - 10:00**
- `10` will book **10:15 - 13:00**
- `13` will book **13:15 - 15:00**
- `15` will book **15:15 - 17:00**
- `17` will book **17:15 - 20:00**

#### -r, --room
Must be formatted like this: `NI:A0403`

For a complete list of rooms, please visit https://schema.mah.se/resursbokning.jsp and click on the tab _Niagara_.

#### -h, --help
Prints the help text for the program.

#### -V, --version
Prints the version of the program

## Examples
```
$ mah-book-room -u ab1234 -p myPassword -r NI:C0405 -d tomorrow -t 13
```
.. will book room **NI:C0405** for **tomorrow** between **13:15-15:00**.

```
$ mah-book-room -u ab1234 -p myPassword -r NI:A0309 -d 16-01-01 -t 08
```
.. will book room **NI:A0309** on **January the 1st 2016** between **08:15-10:00**.

## Common error messages from schema.mah.se
#### Collision
```
$ Bokningen gick inte att spara pga kollision med följande resurser: NI:A0403
```
.. means the room is already booked by you or someone else. Please try with another room.

#### Missing user rights
```
$ Din användare har inte rättigheter att skapa resursbokningar.
```
.. probably means you have entered the wrong login credentials.


## License
MIT
