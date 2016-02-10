var express = require('express')
  , app = express()
  ,sys = require('sys')
  , httpProxy= require('http-proxy')
  ,colorUtils= require('./colorUtils.js')
  ,Canvas=require('canvas')
  ,fs=require('fs')
  ,PixelTileServer=require('./PixelTileServer.js')
  ,url=require('url')
	,http=require('http');
  
var webProxyPort=8000;

var webPort=8080;


//var gameProxyPort=9000;

var gamePort=9100;
var gameImagePort=9101;



app.use(express.static(__dirname+'/public'));
app.listen(webPort, "127.0.0.1");



var gameServer=new PixelTileServer(gamePort,gameImagePort,true);

var proxy = httpProxy.createServer({ws:true});

var proxyServer = http.createServer(function (req, res ) {

  	if(req.url.substring(0, "/game1".length) === "/game1"){
			proxy.web(req, res, {
				target: "http://127.0.0.1:"+gameImagePort
			});
  	}
  	else{
			proxy.web(req, res, {
				target: "http://127.0.0.1:"+webPort
			});
  	}
});


proxyServer.on('upgrade', function (req, socket, head) {
	//console.log(req);
	if(req.url=="/game1/"){
		proxy.ws(req, socket, head, {
				target: "ws://127.0.0.1:"+gamePort
		});
  }
});

proxyServer.listen(8000);
