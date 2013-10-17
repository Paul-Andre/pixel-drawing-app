var express = require('express')
  , app = express()
  ,sys = require('sys')
  , httpProxy= require('http-proxy')
  ,colorUtils= require('./colorUtils.js')
  ,Canvas=require('canvas')
  ,fs=require('fs')
  ,PixelTileServer=require('./PixelTileServer.js')
  ,url=require('url');
  
(require('./dynamicDns.js'))()  //init dynamicDns updater.

app.use(express.static(__dirname+'/public'));
app.listen(8080, "127.0.0.1");


var webProxyPort=8000;

var webPort=8080;


//var gameProxyPort=9000;

var gamePort=9100;
var gameImagePort=9101;



gameServer=new PixelTileServer(64,64,gamePort,gameImagePort,true);



var webProxyServer = httpProxy.createServer(function (req, res, proxy) {

  	if(req.url.substring(0, "/game1".length) === "/game1"){
  	//console.log("hello from if");
	proxy.proxyRequest(req, res, {
    host: 'localhost',
    port: gameImagePort
  	});
  	}
  	else
  	{
  	//console.log("hello from else");
	proxy.proxyRequest(req, res, {
    host: 'localhost',
    port: webPort
  	});
  	}

  	
});

webProxyServer.on('upgrade', function (req, socket, head) {

    console.log(req);
   if(req.url=="/game1/"){
    webProxyServer.proxy.proxyWebSocketRequest(req, socket, head, {
    host: 'localhost',
    port: gamePort
  });
  }
    
});

webProxyServer.listen(webProxyPort);













/*
//testing colorUtils
console.log(colorUtils.webcolorToCsscolor(0xfff));
//testing Canvas
var canvas=new Canvas(512,512);
var ctx=canvas.getContext("2d");
ctx.fillRect(5,24,234,234);
var buf =canvas.toBuffer();
fs.writeFile('image.png', buf);
*/
