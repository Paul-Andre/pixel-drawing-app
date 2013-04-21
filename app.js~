var express = require('express')
  , app = express()
  ,sys = require('sys');
  
var httpProxy= require('http-proxy')



app.use(express.static(__dirname+'/public'));
app.listen(8080, "127.0.0.1");


var proxy = httpProxy.createServer(8080, "127.0.0.1");
proxy.listen(8000);
