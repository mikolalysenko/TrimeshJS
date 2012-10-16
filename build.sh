#!/bin/sh
./node_modules/browserify/bin/cmd.js ./index.js -o ./build/riemann.js
./node_modules/uglify-js/bin/uglifyjs < ./build/riemann.js > ./build/riemann.js.min

