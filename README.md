# mah-book-room

A simple CLI-tool to let you book group rooms at the building Niagara on Malmö Högskola.

## Installation
```
$ npm install -g mah-book-room
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
Must be formatted like this: `15-10-31`

.. or more formally: as **[YY-MM-DD]**.

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

#### -v, --version
Prints the version of the program

## Examples
```
$ mah-book-room -u ab1234 -p myPassword -r NI:C0405 -d 15-09-19 -t 13
```
.. will book room **NI:C0405** on **September the 19th 2015** between **13:15-15:00**.

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
The MIT License (MIT)

Copyright (c) 2015 David Josefson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
