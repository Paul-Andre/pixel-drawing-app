var colorUtils=require("colorUtils");
var canvas=require("canvas");
var websocket=require("ws");

s
	
//geting PixelTile
var filedata = fs.readFileSync('./public/PixelTile.js','utf8');
eval(filedata);

function PixelTileServer(w,h,port){

	this.tile=new PixelTile(w,h);
	
	this.width=w;
	this.height=h;
	
	

}


PixelTileServer.prototype.
