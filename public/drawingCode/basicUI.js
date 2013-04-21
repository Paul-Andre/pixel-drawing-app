


//jQuery commands for ui
$(".sideBar").css("width",250);
$("#screenContainer").css("left",250).css("right",250);
$("#pinkButton")
		.click(function(){
			currentColor=initialPink;
			updateDisplayer();
		});
$("#blackButton")
		.click(function(){
			currentColor=0x122;
			updateDisplayer();
		});
$("#blueButton")
		.click(function(){
			currentColor=0x5fa;
			updateDisplayer();
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
		
		window.drawStuff||window.drawStuff();
}


if(window.mainPartLoaded){
resizeCanvas();
//placing the tile in the center
position.x=canvas.width*0.5-tile.width*0.5*position.s;
position.y=canvas.height*0.5-tile.height*0.5*position.s;

drawStuff();
}

window.resizeCanvas=resizeCanvas;
window.updateDisplayer=updateDisplayer;
window.basicUILoaded=true;
