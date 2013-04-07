var WebSocketServer = require('ws').Server;
var _ = require("underscore");

var port = process.env.port||8000;

var wss = new WebSocketServer({port: port});
  
var wsArray=[];
  
wss.on('connection', function wssOnConnection(ws) {

	wsArray.push(ws);	
	
    ws.on('message', function wsOnMessage(message,flags) {
        console.log('received: %s', message);
    });
    ws.send('something');
    
    ws.on('close',function wsOnClose(){
		
		
		wsArray=_.reject(wsArray,function wsArrayReject(el){ //delete current websocket from the array.		
	  		  return el===ws;
		});
	});
    
});
