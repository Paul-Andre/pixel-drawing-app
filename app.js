var express = require('express')
  , app = express()
  ,sys = require('sys')
  , httpProxy= require('http-proxy')
  ,colorUtils= require('./colorUtils.js')
  ,Canvas=require('canvas')
  ,fs=require('fs');


app.use(express.static(__dirname+'/public'));
app.listen(8080, "127.0.0.1");


var proxy = httpProxy.createServer(8080, "127.0.0.1");
proxy.listen(8000);

console.log(colorUtils.webcolorToCsscolor(0xfff));

var canvas=new Canvas(512,512);
var ctx=canvas.getContext("2d");
ctx.fillRect(5,24,234,234);
var buf =canvas.toBuffer();
fs.writeFile('image.png', buf);
