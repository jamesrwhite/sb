sb
==

A simple tool to benchmark a Sphinx search server.

Installation
------------

````
npm install -g sb
````

Usage
------

````
sb -h localhost -p 9306 -q "select * from test1 where match('test')" -n 1000 -c 2500
````

Output
------

````
-------------------------
 Configuration
-------------------------
 Host:          localhost
 Port:          9306
 Connections:   1000
 Concurrency:   2500

-------------------------
 Results
-------------------------
 Time:          13.201s
 Queries:       25000
 Performance:   1894 p/s
````

Todo:
------

- Better display of results
- Better checking of what options are passed
- Allow for running multiple queries, using a text file input like `siege` perhaps?

License
--------

The MIT License (MIT)

Copyright (c) 2014 James White

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
