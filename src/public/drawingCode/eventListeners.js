

var ws= new WebSocket("ws://"+location.host+"/game1/");
ws.binaryType="arraybuffer"



ws.onmessage=function(msg){
 // console.log(msg.data);
	var offset=0;

	while (offset<msg.data.byteLength){
		
		var view=new DataView(msg.data,offset);
		
		var type=view.getUint8(0);
		
		
		if (type==0){
			// drawing something
		
			var subtype=view.getUint8(1);
			
			if (subtype==1){
				// drawing a single pixel
			
				var x= view.getUint16(2)
				var y= view.getUint16(4)
				var webcolor= view.getUint16(6)
				var bufcolor = colorUtils.webcolorToBufcolor(webcolor);
			
				tile.putSinglePixel(x,y,bufcolor);
				
				offset+=8;
				
			}
			else if (subtype==2){
				// drawing a line
			
				var x1= view.getUint16(2);
				var y1= view.getUint16(4);
				var x2= view.getUint16(6);
				var y2= view.getUint16(8);
				var webcolor= view.getUint16(10);
				var bufcolor = colorUtils.webcolorToBufcolor(webcolor);
				
			
				bresenham(x1,y1,x2,y2,function(x,y){
					tile.putSinglePixel(x,y,bufcolor);
				});
				
				offset+=12;
			}
			
		}
		
		else{
			alert("Unrecognized command received from server.");
			break;
		}
			
	}
	
	requestRedraw();
}



ws.onclose=function(){
	alert("connection lost\n Please wait a few seconds and refresh page")
};


ws.onerror=function(evt){
	console.log(evt);alert(evt);
};


function sendSinglePixel(x,y,webcolor){

	var buf= new ArrayBuffer(8);
	var view=new DataView(buf);
	
	view.setUint16(0,1);
	view.setUint16(2,x);
	view.setUint16(4,y);
	view.setUint16(6,webcolor);
	
	ws.send(buf);
}

function sendLine(x1,y1,x2,y2,webcolor){

	var buf= new ArrayBuffer(12);
	var view=new DataView(buf);
	
	view.setUint16(0,2);
	view.setUint16(2,x1);
	view.setUint16(4,y1);
	view.setUint16(6,x2);
	view.setUint16(8,y2);
	view.setUint16(10,webcolor);
	
	ws.send(buf);
}




// canvas specific event listeners.




function cancelEvent(e)   //used to cancel all default behavior for events. Contains lots of "browser quirk targetting" stuff. I should probably redo this.
{
  //e = e ? e : window.event;
  if(e.stopPropagation)
    e.stopPropagation();
  if(e.preventDefault)
    e.preventDefault();
  e.cancelBubble = true;
  e.cancel = true;
  e.returnValue = false;
  return false;
}

function onMouseWheel(evt){
	var wheelData = evt.detail ? evt.detail/-3 : evt.wheelDelta / 120;  // normalizing wheel data.
				
	var x, y;
		
	if(evt.offsetX) {
		x = evt.offsetX;
		y = evt.offsetY;
	}
	else if(evt.layerX) {
		x = evt.layerX;
		y = evt.layerY;
	}
	
	x=Math.max(position.x,Math.min(position.x+tile.width*position.s,x));
	y=Math.max(position.y,Math.min(position.y+tile.height*position.s,y));	
	
	newS=Math.max(position.s+wheelData,1);	
		
	position.x=x-(x-position.x)*newS/position.s;
	position.y=y-(y-position.y)*newS/position.s;
	
	position.x=Math.min(canvas.width*0.5,position.x);
	position.y=Math.min(canvas.height*0.5,position.y);
	
	position.x=Math.max(canvas.width*0.5-tile.width*newS,position.x);
	position.y=Math.max(canvas.height*0.5-tile.height*newS,position.y);		
	
	position.s=newS
	
	position.x=position.x|0;
	position.y=position.y|0;
	
	/*if(position.s<=2){
	
		position.x=canvas.width*0.5-tile.width*newS*0.5;
		position.y=canvas.height*0.5-tile.height*newS*0.5;
			
	}*/

	requestRedraw();
			
	return cancelEvent(evt);
				
}

function onKeyDown(evt){
	if (evt.keyCode == 37 || evt.keyCode == 65) {position.x-=10;} //left
	if (evt.keyCode == 39 || evt.keyCode == 68) {position.x+=10;} //right
	if (evt.keyCode == 38 || evt.keyCode == 87) {position.y-=10;} //up
	if (evt.keyCode == 40 || evt.keyCode == 83) {position.y+=10;} //down
	requestRedraw();
}

// This is for when the user draws lines
var lastX=0, lastY=0;
function draw(x,y,dragging){

	if(x>=canvas.width||x<0){mouse[1]=false;return false;}
	if(y>=canvas.height||y<0){mouse[1]=false;return false;}

	var x=Math.floor((x-position.x)/position.s);
	var y=Math.floor((y-position.y)/position.s);
	
	if(x>=tile.width||x<0){mouse[1]=false;return false;}
	if(y>=tile.height||y<0){mouse[1]=false;return false;}
	

    if (dragging){
    
    bresenham(lastX,lastY,x,y,function(x,y){
    
    tile.putSinglePixel(x,y,currentColor.bufcolor);
    
    })
	sendLine(lastX,lastY,x,y,currentColor.webcolor);

	}else{
	
	
	    tile.putSinglePixel(x, y,currentColor.bufcolor);
		sendSinglePixel(x,y,currentColor.webcolor);
	}

	lastX=x;
	lastY=y;
	requestRedraw();

	return true;
}


var initialMiddleMouseButtonX=0,initialMiddleMouseButtonY=0;
var initialTilePositionX=0,initialTilePositionY=0;

function onMouseDown(evt){

	var x, y;
		
	if(evt.offsetX) {
		x = evt.offsetX;
		y = evt.offsetY;
	}
	else if(evt.layerX) {
		x = evt.layerX;
		y = evt.layerY;
	}

	mouse[evt.which]=true;
	
	if(evt.which==2){
		initialMiddleMouseButtonX=x;
		initialMiddleMouseButtonY=y;
		initialTilePositionX=position.x;
		initialTilePositionY=position.y;
	}
	
	if(evt.which==1){
		
		draw(x,y);
		drawing=true;
	}
	
	if(evt.which==3){
			
		var tileX=Math.floor((x-position.x)/position.s);
		var tileY=Math.floor((y-position.y)/position.s);
		
		if(tileX>=tile.width||tileX<0){return false;}
		if(tileY>=tile.height||tileY<0){return false;}
		
		setCurrentColorFromRgba(tile.selectColor(tileX,tileY));
	}
	
	return	cancelEvent(evt);
}

function onMouseUp(evt){

	mouse[evt.which]=false;
	return	cancelEvent(evt);
	
}

function onMouseMove(evt){

	var x, y;
		
	if(evt.offsetX) {
		x = evt.offsetX;
		y = evt.offsetY;
	}
	else if(evt.layerX) {
		x = evt.layerX;
		y = evt.layerY;
	}
	
	if(mouse[2]){
	
		position.x=initialTilePositionX+(x-initialMiddleMouseButtonX);
		position.y=initialTilePositionY+(y-initialMiddleMouseButtonY);
		
		
		requestRedraw();
	}
	if(mouse[1]){
		draw(x,y,true)
	}
	return	cancelEvent(evt);
}

function onMouseLeave(evt){

	mouse[1]=false;
	//mouse[2]=false;
	mouse[3]=false;
	
	return	cancelEvent(evt);
}

// addEventListeners /////


canvas.addEventListener("mousewheel",onMouseWheel
, false);

canvas.addEventListener("DOMMouseScroll",onMouseWheel
, false);


window.addEventListener('keydown',onKeyDown,false);

canvas.addEventListener('mousedown',onMouseDown,false);
canvas.addEventListener('mouseup',onMouseUp,false);
canvas.addEventListener('mousemove',onMouseMove,false);
canvas.addEventListener('mouseleave',onMouseLeave,false);
canvas.addEventListener ("mouseout", onMouseLeave, false);
canvas.addEventListener('contextmenu', function(e){return cancelEvent(e);},false);

//canvas.addEventListener("")

