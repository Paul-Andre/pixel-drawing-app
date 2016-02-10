function setCurrentColorFromRgba(rgba){

	currentColor.bufcolor=colorUtils.rgbaToBufcolor(rgba);
	currentColor.webcolor=colorUtils.rgbToWebcolor(rgba);
	currentColor.csscolor=colorUtils.rgbToCsscolor(rgba);

	updateDisplayer();
}



var colorPicker = document.getElementById("colorPicker");


(function(){

	var ctx=colorPicker.getContext("2d");
	var tile=new PixelTile(16,18);
	var image=new Image();
	image.onload=function(){

		tile.ctx.drawImage(image,0,0);
		setImageSmoothing(ctx,false);
		ctx.drawImage(tile.image,0,0,208,234);
		
		colorPicker.ready=true
		colorPicker.tile=tile;
	}
	image.src="selector.png"



	colorPicker.addEventListener("mousedown",function(evt){

		if (colorPicker.ready){	
			var x, y;
			
			if(evt.offsetX) {
				x = evt.offsetX;
				y = evt.offsetY;
			}
			else if(evt.layerX) {
				x = evt.layerX;
				y = evt.layerY;
			}
		
			//console.log(evt);	
		
			x=Math.floor((x)*16/208);
			y=Math.floor((y)*16/208);	

		
			if(x>=tile.width||x<0){return;}
			if(y>=tile.height||y<0){return;}

		
			setCurrentColorFromRgba(tile.selectColor(x,y));
		
		}

	}, false);

})();



var colorDisplayer=document.getElementById("colorDisplayer");


function updateDisplayer(){

	colorDisplayer.style.backgroundColor= currentColor.csscolor;

}
	updateDisplayer();
	
	

//get all the canvases. 	
	
	
var mainCanvases=document.getElementsByClassName("mainCanvas");

var canvas=document.getElementById("screen");

// Code to resize the canvas when the screen is resized //////////////


window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {


		for(var i=0;i<mainCanvases.length;i++){
				
				mainCanvases[i].width=window.innerWidth-500;
				mainCanvases[i].height=window.innerHeight;	
					
		}		
		
		requestRedraw();
}

  
  	document.getElementById("zoomInButton")
    .addEventListener("click",function(){
    
    position.s++;
    position.x=canvas.width*0.5-tile.width*0.5*position.s;
position.y=canvas.height*0.5-tile.height*0.5*position.s;
    requestRedraw();
    
    },false);
  	document.getElementById("zoomOutButton")
    .addEventListener("click",function(){
    
    position.s=Math.max(position.s-1,1)
    position.x=canvas.width*0.5-tile.width*0.5*position.s;
position.y=canvas.height*0.5-tile.height*0.5*position.s;
    requestRedraw();
    
    },false);


//resizeCanvas();
//placing the tile in the center
//position.x=canvas.width*0.5-tile.width*0.5*position.s;
//position.y=canvas.height*0.5-tile.height*0.5*position.s;


