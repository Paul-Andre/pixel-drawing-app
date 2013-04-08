	requestAnimationFrame = (function(){
          return  window.requestAnimationFrame       || 
                  window.webkitRequestAnimationFrame || 
                  window.mozRequestAnimationFrame    || 
                  window.oRequestAnimationFrame      || 
                  window.msRequestAnimationFrame     || 
                  function(/* function */ callback, /* DOMElement */ element){
                    window.setTimeout(callback, 1000 / 60);
                  };
    })();
	
//functions for setting and testing crip scaling

function setImageSmoothing(ctx,state){

	ctx.mozImageSmoothingEnabled=state;
	ctx.webkitImageSmoothingEnabled=state;
	ctx.oImageSmoothingEnabled=state;
	ctx.msImageSmoothingEnabled=state;
	ctx.imageSmoothingEnabled=state;

}


function testCrispScaling(){

	var sourceImg=document.createElement("canvas");
	sourceImg.height =1;
	sourceImg.width = 2;
	var sourceCtx=sourceImg.getContext("2d");

	var destinationImg=document.createElement("canvas");
	destinationImg.height=2;
	destinationImg.width=4;
	var destinationCtx=sourceImg.getContext("2d");

	setImageSmoothing(destinationCtx,false)

	sourceCtx.fillStyle="#FFFFFF"
	sourceCtx.fillRect(0,0,1,1);
	sourceCtx.fillStyle="#000000"
	sourceCtx.fillRect(1,0,1,1);

	destinationCtx.drawImage(sourceImg,0,0,4,2);
	
	return (destinationCtx.getImageData(1, 0, 1, 1).data[0] == 255);

}

var CRISP_SCALABLE = testCrispScaling();
if(!CRISP_SCALABLE){alert("Your browser doesn't support crisp scaling in canvas.\n\nSorry, but things are going to look blurry.")};
