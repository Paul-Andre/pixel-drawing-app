


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
	
	this.addEventListener("mousedown",(function(evt){
	
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
	
		console.log(evt);	
	
		x=Math.floor((x)*16/208);
		y=Math.floor((y)*16/208);	

	
		if(x>=tile.width||x<0){return;}
		if(y>=tile.height||y<0){return;}

	
	
		currentColor=tile.selectColor(x,y);
		updateDisplayer();
	
	
	}
	
	
	
	
	}).bind(this) )
})



var colorDisplayer=$("#colorDisplayer");


function updateDisplayer(){

	colorDisplayer.css("background-color", colorUtils.webcolorToCsscolor(currentColor)    )

}
	updateDisplayer();
	
	

//get all the canvases. 	
	
	
var mainCanvases=$(".mainCanvas");

var canvas=document.getElementById("screen");

// Code to resize the canvas when the screen is resized //////////////


window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {


		for(var i=0;i<mainCanvases.length;i++){
				
				mainCanvases[i].width=window.innerWidth-500;
				mainCanvases[i].height=window.innerHeight;	
					
		}		
		
		drawStuff();
}

  
   $( "#zoomIn" ).button({
      text: false,
      icons: {
        primary: "ui-icon-plusthick"
      }
    })
    .click(function(){
    
    position.s++;
    position.x=canvas.width*0.5-tile.width*0.5*position.s;
position.y=canvas.height*0.5-tile.height*0.5*position.s;
    drawStuff();
    
    });
    $( "#zoomOut" ).button({
      text: false,
      icons: {
        primary: "ui-icon-minusthick"
      }
    }).click(function(){
    
    position.s=Math.max(position.s-1,1)
    position.x=canvas.width*0.5-tile.width*0.5*position.s;
position.y=canvas.height*0.5-tile.height*0.5*position.s;
    drawStuff();
    
    });


$( "#zoomContainer" ).buttonset();
//resizeCanvas();
//placing the tile in the center
//position.x=canvas.width*0.5-tile.width*0.5*position.s;
//position.y=canvas.height*0.5-tile.height*0.5*position.s;


