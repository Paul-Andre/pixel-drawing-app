// Code that actually makes the tile and ties the ends together  //////////////////////////////////////////




var canvas=document.getElementById("screen");
var ctx=canvas.getContext("2d");

//var tile;

var img=new Image();
img.onload=function(){

	tile = new PixelTile(img.width,img.height);

	tile.ctx.globalCompositeOperation="destination-over";
	tile.ctx.drawImage(img,0,0);

	resizeCanvas();
	//placing the tile in the center
	position.s=2;
	position.x=canvas.width*0.5-tile.width*0.5*position.s;
	position.y=canvas.height*0.5-tile.height*0.5*position.s;
	requestRedraw();


}

img.onerror=function(evt){
	//in case the image can't be loaded for some reason

	console.log(evt);

	tile = new PixelTile(256,256);

	tile.ctx.fillStyle=colorUtils.webcolorToCsscolor(0xddd);
	tile.ctx.fillRect(0,0,256,256);
	resizeCanvas();
	//placing the tile in the center
	position.x=canvas.width*0.5-tile.width*0.5*position.s;
	position.y=canvas.height*0.5-tile.height*0.5*position.s;

	drawStuff();

}

img.src="http://"+location.host+"/game1/img.png";
//alert(img.src);



var previousX=position.x;
var previousY=position.y;
var previousS=position.s;
function drawStuff(){

	ctx.clearRect(previousX,previousY,tile.width*previousS, tile.height*previousS)

	setImageSmoothing(ctx,false);
		
	ctx.drawImage(tile.image, position.x, position.y, tile.width*position.s, tile.height*position.s);
	previousX=position.x;
  previousY=position.y;
	previousS=position.s;
	
}

// The point of this is to not redraw things every 1/60 of a second yet not to redraw everything on every event.
var requestedDrawStuff=false;

function requestRedraw(){

	if(!requestedDrawStuff){
		
		requestAnimationFrame(function(){
		
			drawStuff();
			requestedDrawStuff=false;
		
		})
	
		requestedDrawStuff=true;
	}

}


