#!/bin/sh

cp -r -T src testing
cd testing
#nodejs appStart.js
#iojs appStart.js
#node startApp.js
node app.js
