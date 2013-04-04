var WebSocketServer = require('ws').Server;
var _ = require("underscore");

var wss = new WebSocketServer({port: 8000});
  
var wsArray=[];
  
wss.on('connection', function wssOnConnection(ws) {

	wsArray.push(ws);	
	
    ws.on('message', function wsOnMessage(message,flags) {
        console.log('received: %s', message);
    });
    ws.send('something');
    
    ws.on('close',function wsOnClose(){
		
		
		wsArray=_.reject(wsArray,function wsArrayReject(el){
		
			//console.log(el);
			
			//console.log(ws);
			
			console.log(el===ws);
			
	  		  return el===ws;
		
		});
	
		console.log("["+wsArray.join()+"]");
     
     
	});
    
});
