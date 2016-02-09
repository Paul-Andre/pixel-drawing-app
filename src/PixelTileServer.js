var colorUtils=require("./colorUtils.js");
var Canvas=require("canvas");
var websocket=require("ws");
var fs=require("fs");
var PixelTile=require("./PixelTile.js");
var bresenham=require('./bresenham.js');
var http=require("http");
var strftime=require('strftime');
var DataView=require("buffer-dataview");

var SAVED_IMAGES_PATH = "SavedImages/"

// save says whether of not to regularly save the images
function PixelTileServer(w,h,port,imageport,save){
	
	
	console.log("picture tile server start");
	
	var origImg
	
	var origData=fs.readFileSync(__dirname + '/blankImage.png')
	
	origImg = new Canvas.Image(); // Create a new Image
    
  origImg.src = origData;

	
	
	this.tile=new PixelTile(origImg);
	
	
	//this.tile.ctx.fillStyle=colorUtils.webcolorToCsscolor(0xddd);
	//this.tile.ctx.fillRect(0,0,w,h);
	
	
	this.width=origImg.width;
	this.height=origImg.height;


	if(save){
		// if SAVED_IMAGES_PATH directory doesn't exist, create it.
		try {
			fs.mkdirSync(SAVED_IMAGES_PATH);
		} catch(e) {
			if ( e.code != 'EEXIST' ) throw e;
		}
		var folderName=strftime('%F %T');
		fs.mkdirSync(SAVED_IMAGES_PATH+folderName);
	}
	
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
			
				if (error!=null){console.error(error)};
			
			}
			
			);
		}
		
		receivedData.length=0;
		receivedDataLength=0;
		
		savePicture(__dirname+"/image.png")
		savePictureToFolder();
	}
}	

		
		
		
		//console.log(wss);
		
		ws.on('close',function wsOnCloseLambda(evt){
		
		
		
		console.log("closed "+id+"\n")
			console.log("people online: "+wss.clients.length);


		
		});
	});

var canSaveAgain=true
var needToSave=false;
function savePictureToFolder(){

		needToSave=true;
		
		if(canSaveAgain){
		savePicture(SAVED_IMAGES_PATH+folderName +"/"+ (strftime("%s"))+ ".png");
		canSaveAgain=false
		needToSave=false;
		setTimeout(function(){
		canSaveAgain=true;if(needToSave){
		
		savePictureToFolder()
		}
		},5000)
		
		
		}else{
		needToSave=true;
		}

}

function savePicture(path){ 

	var out = fs.createWriteStream(path)
	  , stream = tile.image.pngStream();

	stream.on('data', function(chunk){
	  out.write(chunk);
	});

	stream.on('end', function(){
	//  console.log('saved '+name+".png");
	});

}


/*if (save){



var counter=0;
setInterval(function(){

	savePicture("../SavedImages/"+folderName +"/"+ (strftime("%s%L"))+ ".png");
	counter++;

},120000)
}*/

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

