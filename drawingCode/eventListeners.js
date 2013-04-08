
function addAllEventListeners(canvas,tile){

// canvas specific event listeners.


function selectColorFromTile(x,y){

	var x=Math.floor((x-position.x)/position.s);
	var y=Math.floor((y-position.y)/position.s);
	
	if(x>=tile.width||x<0){return false;}
	if(y>=tile.height||y<0){return false;}
	
	currentColor=tile.selectColor(x,y);
	updateDisplayer();
	
}


function cancelEvent(e)   //used to cancel all default behavior for events. Contains lots of "platform targetting" stuff. I should probably redo this.
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

	drawStuff();
			
	return cancelEvent(evt);
				
}

function onKeyDown(evt){
	if (evt.keyCode == 37 || evt.keyCode == 65) {position.x-=10;} //left
	if (evt.keyCode == 39 || evt.keyCode == 68) {position.x+=10;} //right
	if (evt.keyCode == 38 || evt.keyCode == 87) {position.y-=10;} //up
	if (evt.keyCode == 40 || evt.keyCode == 83) {position.y+=10;} //down
	requestRedraw();
}

var lastX=0, lastY=0;
function draw(x,y,dragging){

	if(x>=canvas.width||x<0){mouse[1]=false;return false;}
	if(y>=canvas.height||y<0){mouse[1]=false;return false;}

	var x=Math.floor((x-position.x)/position.s);
	var y=Math.floor((y-position.y)/position.s);
	
	if(x>=tile.width||x<0){mouse[1]=false;return false;}
	if(y>=tile.height||y<0){mouse[1]=false;return false;}
	

    if (dragging){
    var x1 = lastX;
    var y1 = lastY;
    var x2 = x;
    var y2 = y;
    // Define differences and error check
    var dx = Math.abs(x2 - x1);
    var dy = Math.abs(y2 - y1);
    var sx = (x1 < x2) ? 1 : -1;
    var sy = (y1 < y2) ? 1 : -1;
    var err = dx - dy;
   		// Set first coordinates
  		//  tile.putSinglePixel(y1, x1,0);
    // Main loop
    while (!((x1 == x2) && (y1 == y2))) {
      var e2 = err << 1;
      if (e2 > -dy) {
        err -= dy;
        x1 += sx;
      }
      if (e2 < dx) {
        err += dx;
        y1 += sy;
      }
      // Set coordinates
    tile.putSinglePixel(x1, y1,currentColor);
    }
    
    // http://stackoverflow.com/questions/4672279/bresenham-algorithm-in-javascript
    

	}else{
	
	
	    tile.putSinglePixel(x, y,currentColor);
	
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
		
		selectColorFromTile(x,y);
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
		
		/*if(BrowserDetect.browser=="Firefox"){requestRedraw();}
		else{
			drawStuff();
		}*/
		
		
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

var requestedRedraw=false;
function requestRedraw(){

	if(!requestedRedraw){
		requestAnimationFrame(function(){drawStuff();requestedRedraw=false});
	}

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

}
