//  PixelTile class ///////////////////////////////////////////

function PixelTile(w,h){

	this.width=w;
	this.height=h;

	//this.webcolorData16=d16||(new Uint16Array(new ArrayBuffer(w*h*2)))
	
	this.image=new Canvas(w,h);
	this.ctx=this.image.getContext("2d");
	this.imageData=this.ctx.createImageData(w,h);
	this.imageData32=new Int32Array(this.imageData.data.buffer);
	
	
	this.pixelPutter=this.ctx.createImageData(1,1);
	this.pixelPutter32=new Int32Array(this.pixelPutter.data.buffer);
	
	this.t=this;
	
}


PixelTile.prototype.putSinglePixel=function(x,y,webcolor){

	this.pixelPutter32[0]=colorUtils.webcolorToBufcolor(webcolor);
	this.ctx.putImageData(this.pixelPutter,x,y);

}

PixelTile.prototype.selectColor=function(x,y){

	var webcolor =0;

	var pixel=this.ctx.getImageData(x,y,1,1)
	
	webcolor|=(pixel.data[0] >>> 4)<<8;
	webcolor|=(pixel.data[1] >>> 4)<<4;
	webcolor|=(pixel.data[2] >>> 4)<<0;
	
	return webcolor;
}

