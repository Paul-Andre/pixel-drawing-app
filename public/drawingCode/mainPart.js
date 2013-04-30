// Code that actually makes the tile and ties the ends together  //////////////////////////////////////////




var canvas=document.getElementById("screen");
var ctx=canvas.getContext("2d");

var tile;

var img=new Image();
img.onload=function(){

tile = new PixelTile(img.width,img.height);

tile.ctx.globalCompositeOperation="destination-over";
tile.ctx.drawImage(img,0,0);

resizeCanvas();
//placing the tile in the center
position.x=canvas.width*0.5-tile.width*0.5*position.s;
position.y=canvas.height*0.5-tile.height*0.5*position.s;

drawStuff();


}
img.src="http://"+location.host+"/game1/img.png"






function drawStuff(){

	ctx.clearRect(0,0,canvas.width,canvas.height)

	setImageSmoothing(ctx,false);
		
	ctx.drawImage(tile.image,    position.x  ,    position.y ,    tile.width*position.s  ,   tile.height*position.s);
	
}

var requestedDrawStuff=false;

function requestDrawStuff(){

	if(!requestedDrawStuff){
		
		requestAnimationFrame(function(){
		
			drawStuff();
			requestedDrawStuff=false;
		
		})
	
		requestedDrawStuff=true;
	}



}








