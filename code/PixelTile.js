var Canvas=require("canvas");
var colorUtils=require("./colorUtils");
//  PixelTile class ///////////////////////////////////////////


////////////   This is the nodejs implementation! /////////////





function PixelTile(cnv){

	var w=this.width=cnv.width;
	var h=this.height=cnv.height;

	//this.webcolorData16=d16||(new Uint16Array(new ArrayBuffer(w*h*2)))
	
	this.image=new Canvas(w,h);
	this.ctx=this.image.getContext("2d");
	this.ctx.drawImage(cnv,0,0);
	this.imageData=this.ctx.createImageData(w,h);
	
	
	this.pixelPutter=this.ctx.createImageData(1,1);
	
	this.t=this;
	
}


PixelTile.prototype.putSinglePixel=function(x,y,n){
	
	var bits = [(n>>>0)&1,(n>>>1)&1,(n>>>2)&1,(n>>>3)&1,(n>>>4)&1,(n>>>5)&1,(n>>>6)&1,(n>>>7)&1,(n>>>8)&1,(n>>>9)&1,(n>>>10)&1,(n>>>11)&1];
	
	//I brought the colorUtil Code insideHere
	
		var bytes=[];
	
		for (var i=0; i<3;i++){
		
			var byte=0;
		
			byte|=bits[i*4+0];
			byte|=bits[i*4+1]<<1;
			byte|=bits[i*4+2]<<2;
			byte|=bits[i*4+3]<<3;		
			byte|=bits[i*4+0]<<4;
			byte|=bits[i*4+1]<<5;	
			byte|=bits[i*4+2]<<6;
			byte|=bits[i*4+3]<<7;		
		
		
			bytes[i]=byte;	
		
		}
	
		bytes.reverse(); // turn rgb into bgr
	
		bytes[3]=255; // the alpha channel is opaque
	
	this.pixelPutter.data[0]=bytes[0];
	this.pixelPutter.data[1]=bytes[1];
	this.pixelPutter.data[2]=bytes[2];
	this.pixelPutter.data[3]=bytes[3];	
	
	//console.log("yeah");

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


module.exports=PixelTile;
