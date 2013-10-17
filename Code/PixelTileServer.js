var colorUtils=require("./colorUtils.js");
var Canvas=require("canvas");
var websocket=require("ws");
var fs=require("fs");
var PixelTile=require("./PixelTile.js");
var bresenham=require('./bresenham.js');
var http=require("http");
var strftime=require('strftime');
var DataView=require("buffer-dataview");

function PixelTileServer(w,h,port,imageport,save){
	
	
	console.log("picture tile server start");
	
	this.tile=new PixelTile(w,h);
	
	this.tile.ctx.fillStyle=colorUtils.webcolorToCsscolor(0xddd);
	this.tile.ctx.fillRect(0,0,w,h);	
	
	this.width=w;
	this.height=h;


	var folderName=strftime('%F %T');
	
	save?fs.mkdirSync("../SavedImages/"+folderName):0;
	
	var wss = new websocket.Server({port: port});
	//console.log(wss);

	var lastId=0;
	
	var tile= this.tile;
	
	
	wss.on('connection', function wssOnConnectionLambda(ws) {
	
		var id=lastId++;
	
	
		console.log("connection "+id+"\n");
		console.log("people online: "+wss.clients.length);

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

				sendAsAChain(message);
		    	
		    	
		    	
		    
		    }
		    
		    }
		    
		});
		
		
var receivedData=[], receivedDataLength=0, timeout=null;
	
function sendAsAChain(buffer){

	//console.log("g");	
	
	receivedData.push(buffer);
	receivedDataLength+=buffer.length;
	//console.log(buffer.length);
	
	clearTimeout(timeout);
	
	if (receivedDataLength>=96){sendData()}
	else{timeout=setTimeout(sendData,200)}
	
	function sendData(){
	
		//console.log("pffffff");
		
		var message=new Buffer(receivedDataLength);
		
		for (var i=0, offset=0 ;i<receivedData.length;i++){
			
			receivedData[i].copy(message,offset)
			offset+=receivedData[i].length;
		}
	
		for(var i=0;i<wss.clients.length;i++){
			if(wss.clients[i].readyState=websocket.OPEN)
			wss.clients[i].send(message,{binary:true},function(error){
			
				if (error!=null){console.log(error,"yahyah")};
			
			}
			
			);
		}
		
		receivedData.length=0;
		receivedDataLength=0;
	
	}
}	

		
		
		
		//console.log(wss);
		
		ws.on('close',function wsOnCloseLambda(evt){
		
		
		
		console.log("closed "+id+"\n")
			console.log("people online: "+wss.clients.length);


		
		});
	});

if (save){
function savePicture(name){ //if "blabla.png", then name="blabla"

	var out = fs.createWriteStream("../SavedImages/"+folderName +"/"+ name+".png")
	  , stream = tile.image.pngStream();

	stream.on('data', function(chunk){
	  out.write(chunk);
	});

	stream.on('end', function(){
	//  console.log('saved '+name+".png");
	});

}


var counter=0;
setInterval(function(){

	savePicture("img"+counter);
	counter++;

},120000)
}

	var imageTransmitter=http.createServer(function(req,res){
		
			var stream= tile.image.pngStream()
		
		
			res.writeHead(200, {'Content-Type': 'image/png' });
		
			stream.on('data', function(chunk){
	  			res.write(chunk,"binary");
			});
		
			stream.on('end',function(){ 
				res.end();
			});
	
	
	})
	imageTransmitter.listen(imageport);


}


module.exports=PixelTileServer;
