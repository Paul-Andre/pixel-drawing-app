// Code that actually makes the tile and ties the ends together  //////////////////////////////////////////


window.addEventListener("load",function(){

canvas=document.getElementById("screen");
ctx=canvas.getContext("2d");

var tile = new PixelTile(256*2,256*2);


for(i=0;i<tile.imageData32.length;i++){  //filling the screen with pink

	//tile.webcolorData16[i]=initialPink;
	tile.imageData32[i]=webcolorToBufcolor(initialPink);
}
//tile.updateImage();
tile.ctx.putImageData(tile.imageData,0,0);    


function drawStuff(){

	ctx.clearRect(0,0,canvas.width,canvas.height)

	setImageSmoothing(ctx,false);
		
	ctx.drawImage(tile.image,    position.x  ,    position.y ,    tile.width*position.s  ,   tile.height*position.s);
	
}

window.drawStuff=drawStuff;

if(window.basicUILoaded){
resizeCanvas();
//placing the tile in the center
position.x=canvas.width*0.5-tile.width*0.5*position.s;
position.y=canvas.height*0.5-tile.height*0.5*position.s;

drawStuff();
}



window.mainPartLoaded=true;

addAllEventListeners(canvas,tile);



},false);