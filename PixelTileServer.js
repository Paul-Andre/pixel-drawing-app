var colorUtils=require("./colorUtils.js");
var Canvas=require("canvas");
var websocket=require("ws");
var fs=require("fs");
var PixelTile=require("./PixelTile.js");
var bresenham=require('./bresenham.js');



function PixelTileServer(w,h,port){

	this.tile=new PixelTile(w,h);
	
	this.tile.ctx.fillStyle=colorUtils.webcolorToCsscolor(0xf45);
	this.tile.ctx.fillRect(0,0,w,h);	
	
	this.width=w;
	this.height=h;



	var wss = new websocket.Server({port: port});

	var lastId=0;
	
	var tile= this.tile;
	
	
	wss.on('connection', function wssOnConnectionLambda(ws) {
	
		var id=lastId++;
	
	
		console.log("connection "+id+"\n");


		ws.on('message', function wsOnMessageLambda(message,flags) {
		
		    if (flags.binary){
		    
		   // console.log(message);
		    	
		    var view=new DataView(message);
		    
		    var type=view.getUint8(0);
		    
		    if (type==0){
		    
		    	var subtype=view.getUint8(1);
		    	
		    	if (subtype==1){
		    	
		    		var x= view.getUint16(2)
		    		var y= view.getUint16(4)
		    		var webcolor= view.getUint16(6)
		    	
		    		tile.putSinglePixel(x,y,webcolor);
		    		
		    	}
		    	else
		    	
		    	if (subtype==2){
		    	
		    		var x1= view.getUint16(2)
		    		var y1= view.getUint16(4)
		    		var x2= view.getUint16(6)
		    		var y2= view.getUint16(8)
		    		var webcolor= view.getUint16(10)
		    	
		    		
		    		bresenham(x1,y1,x2,y2,function(x,y){
		    			tile.putSinglePixel(x,y,webcolor);
		    		});
		    		
		    	}

		    	
		    
		    }
		    
		    }
		    
		    ws.send(message, {binary:flags.binary,  masked:flags.masked})
		});
		
		//console.log(wss);
		
		ws.on('close',function wsOnCloseLambda(evt){
		
		
		
		console.log("closed "+id+"\n")
		
		
		var buf =tile.image.toBuffer();
		fs.writeFile('closed'+id+'.png', buf);
		
		});
	});





}


module.exports=PixelTileServer;

