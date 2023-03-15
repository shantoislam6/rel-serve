# rel-serve

Simple development http server to reponse static files

Installation
------------

You need node.js and npm. You should probably install this globally.

**Npm way**
```sh
npm install -g rel-serve
```
if you want to use as dev dependency 

```sh
npm install rel-serve --save-dev
```
**Or you can just run this command inside your project's directory without installing**
```sh 
npx rel-serve
```

if want to install Manually and customize
```sh
git clone https://github.com/shantoislam6/rel_serve_sh.git
cd rel-serve
npm install # Local dependencies if you want to hack
npm install -g # Install globally
```
<hr>

Once installation is done, you can run this command inside your project's directory
------------
```sh
rel-serve
```
Or

```sh 
rel-serve -p 8080 -h 127.0.0.1
```



Command line parameters:

* `--port=NUMBER` - select port to use, default: PORT env var or 8080
* `--host=ADDRESS` - select host address to bind to, default: IP env var or 0.0.0.0 ("any address")
* `--help | -h` - display terse usage hint and exit
* `--version | -v` - display version and exit

License
-------

(MIT License)

Copyright (c) 2023 Shanto

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
