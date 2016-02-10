//  PixelTile class ///////////////////////////////////////////
//Web implementation


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


PixelTile.prototype.putSinglePixel=function(x,y,bufcolor){

	this.pixelPutter32[0]=bufcolor;
	this.ctx.putImageData(this.pixelPutter,x,y);

}

// returns a rgba array
PixelTile.prototype.selectColor=function(x,y){
	var data =this.ctx.getImageData(x,y,1,1).data;
	return [data[0], data[1], data[2], data[3]];
}

