///////////////////////////////////
// 
//   
//        colorUtils.js
//
//
//   Unless otherwise stated, all the colors are 12 bit, with 4 bits for every channel
//
//   Webcolor is a two byte color format that has a 12 bits
//
//   Bufcolor is a 4 byte color format that can be dirrectly pasted in the javascript
// image data buffer, with endianness took in consideration.
//
//   Csscolor is the color format used in CSS, like #ffffff.
//   
//   Rgba is an array of numbers from 0 to 255. red green blue alpha

// The point of this whole thing was to transfer 12bit colors through WebSockets.
//



			var colorUtils  =       // changing this will change the name by wich the utility goes

(function(){

	var LITTLE_ENDIAN=testEndianness();

	function hex(n){
		if (n>=16){
			return n.toString(16);
		}
		else{
			return "0"+n.toString(16);
		}
	}


	function rgbToWebcolor(rgba){
		return ((rgba[0]>>4)<<8) | ((rgba[1]>>4)<<4) | ((rgba[2]>>4)<<0);
	}
	
	function rgbaToBufcolor(rgba){
		if(LITTLE_ENDIAN){
			return (rgba[3]<<24) | (rgba[2]<<16) | (rgba[1]<<8) | (rgba[0]<<0);
		}
		else{
			return (rgba[0]<<24) | (rgba[1]<<16) | (rgba[2]<<8) | (rgba[3]<<0);
		}
	}

	function rgbToCsscolor(rgba){
		return "#" + hex(rgba[0]) + hex(rgba[1])
			+ hex(rgba[2])
			;
	}

	
	function bufcolorToRgba(bufcolor){
		var b0 = bufcolor & 255;
		var b1 = (bufcolor >> 8) & 255;
		var b2 = (bufcolor >> 16) & 255;
		var b3 = (bufcolor >> 24) & 255;
		if(LITTLE_ENDIAN){
			return [b0,b1,b2,b3];
		}
		else{
			return [b3,b2,b1,b0];
		}
	}


	function webcolorToBufcolor(n){

		var bits = [(n>>>0)&1,(n>>>1)&1,(n>>>2)&1,(n>>>3)&1,(n>>>4)&1,(n>>>5)&1,(n>>>6)&1,(n>>>7)&1,(n>>>8)&1,(n>>>9)&1,(n>>>10)&1,(n>>>11)&1];
	
		//  ??? TODO: Remove the bits array altogether.
	
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
	
		if (!LITTLE_ENDIAN){  bytes.reverse();  }  //taking care of endianness (^-^) I think...
		
		// ? TODO: Test big-endian systems!
	
		return bytes[0]| (bytes[1]<<8) | (bytes[2]<<16) | (bytes[3]<<24);

	}

	function bufcolorToWebcolor(bufcolor){

		var rgba = bufcolorToRgba(bufcolor);

		var webcolor = 0;

    webcolor|=(rgba[0] >>> 4)<<8;
    webcolor|=(rgba[1] >>> 4)<<4;
    webcolor|=(rgba[2] >>> 4)<<0;
    
    return webcolor;
	}
	
	
function webcolorToCsscolor(n){

			var bits = [(n>>>0)&1,(n>>>1)&1,(n>>>2)&1,(n>>>3)&1,(n>>>4)&1,(n>>>5)&1,(n>>>6)&1,(n>>>7)&1,(n>>>8)&1,(n>>>9)&1,(n>>>10)&1,(n>>>11)&1];
	
		//  ??? TODO: Remove the bits array altogether.
	
		var bytes=[];
	
		for (var i=0; i<3;i++){
		
			var byte=0;
		
			byte|=bits[i*4+0];
			byte|=bits[i*4+1]<<1;
			byte|=bits[i*4+2]<<2;
			byte|=bits[i*4+3]<<3;	
		
		
			bytes[i]=byte;	
		
		}
		
		bytes.reverse(); // turn rgb into bgr
		
		return "#"+bytes[0].toString(16)+bytes[0].toString(16)
			+ bytes[1].toString(16)+bytes[1].toString(16)
			+ bytes[2].toString(16)+bytes[2].toString(16);

}


return {
			"webcolorToBufcolor": webcolorToBufcolor,
			"webcolorToCsscolor": webcolorToCsscolor,
			"rgbToWebcolor":rgbToWebcolor,
			"rgbaToBufcolor":rgbaToBufcolor,
			"rgbToCsscolor":rgbToCsscolor,
			"bufcolorToWebcolor":bufcolorToWebcolor
	}



})();

