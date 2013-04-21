var express = require('express')
  , app = express()
  ,sys = require('sys')
  , httpProxy= require('http-proxy')
  ,colorUtils= require('./colorUtils.js')
  ,Canvas=require('canvas')
  ,fs=require('fs');


app.use(express.static(__dirname+'/public'));
app.listen(8080, "127.0.0.1");


var proxyServer = httpProxy.createServer(function (req, res, proxy) {


	
	
	proxy.proxyRequest(req, res, {
    host: 'localhost',
    port: 8080
  	});
  	
});


proxyServer.on('upgrade', function (req, socket, head) {

    console.log(req);
    
    proxyServer.proxy.proxyWebSocketRequest(req, socket, head, {
    host: 'localhost',
    port: 9000
  });
    
});







var WebSocketServer = require('ws').Server;



var wss = new WebSocketServer({port: 9000});

var lastId=0;

  
wss.on('connection', function wssOnConnectionLambda(ws) {
	
	var id=lastId++;
	
	
	console.log("connection "+id+"\n");


    ws.on('message', function wsOnMessageLambda(message,flags) {
    
        console.log('received from '+id+': ', message)
        //console.log('flags: ', flags,"\n")
        
        ws.send(message, {binary:flags.binary,  masked:flags.masked})
    });
    
    
    
    ws.send('You are now connected to this simple websocket echo server.');
    
    
    ws.on('close',function wsOnCloseLambda(evt){console.log("closed "+id+"\n")});
});










proxyServer.listen(8000);


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
