// Code that actually makes the tile and ties the ends together  //////////////////////////////////////////




canvas=document.getElementById("screen");
ctx=canvas.getContext("2d");

var tile = new PixelTile(256*2,256*2);


function drawStuff(){

	ctx.clearRect(0,0,canvas.width,canvas.height)

	setImageSmoothing(ctx,false);
		
	ctx.drawImage(tile.image,    position.x  ,    position.y ,    tile.width*position.s  ,   tile.height*position.s);
	
}



resizeCanvas();
//placing the tile in the center
position.x=canvas.width*0.5-tile.width*0.5*position.s;
position.y=canvas.height*0.5-tile.height*0.5*position.s;

drawStuff();





