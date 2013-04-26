


//jQuery commands for ui
$(".sideBar").css("width",250);
$("#screenContainer").css("left",250).css("right",250);


$("#colorPicker").each(function(){
	
	
	var t =this;
	var ctx=this.getContext("2d");
	var tile=new PixelTile(16,18);
	var image=new Image();
	image.onload=function(){
	
		tile.ctx.drawImage(image,0,0);
		setImageSmoothing(ctx,false);
		ctx.drawImage(tile.image,0,0,208,234);
	
	}
	image.src="selector.png"
	
	
	
	this.ready=true
	this.tile=tile;
})
.click(function(evt){
if (this.ready){	
//alert("yeah")
var x, y;
		
	if(evt.offsetX) {
		x = evt.offsetX;
		y = evt.offsetY;
	}
	else if(evt.layerX) {
		x = evt.layerX;
		y = evt.layerY;
	}
	
	var tile=this.tile;
	
	
	x=Math.floor((x)*16/208);
	y=Math.floor((y)*16/208);
	

	//alert(x+" "+y);		
	if(x>=tile.width||x<0){return;}
	if(y>=tile.height||y<0){return;}

	
	
	currentColor=tile.selectColor(x,y);
	updateDisplayer();
	
	
}

});



var colorDisplayer=$("#colorDisplayer");


function updateDisplayer(){

	colorDisplayer.css("background-color", colorUtils.webcolorToCsscolor(currentColor)    )

}
	updateDisplayer();
	
	

//get all the canvases. 	
	
	
var mainCanvases=$(".mainCanvas");



// Code to resize the canvas when the screen is resized //////////////


window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {


		for(var i=0;i<mainCanvases.length;i++){
				
				mainCanvases[i].width=window.innerWidth-500;
				mainCanvases[i].height=window.innerHeight;	
					
		}		
		
		window.drawStuff();
}



resizeCanvas();
//placing the tile in the center
position.x=canvas.width*0.5-tile.width*0.5*position.s;
position.y=canvas.height*0.5-tile.height*0.5*position.s;

drawStuff();

