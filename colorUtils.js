///////////////////////////////////
// 
//   
//        colorUtils.js
//
//
//   Unless otherwise stated, all the colors are 12 bit, with 4 bits for every channel
//
//   Webcolor is a two byte color format of my making, that has a 12 bit precision
//
//   Bufcolor is a 4 byte color format that can be dirrectly pasted in the javascript
// image data buffer, with endianness took in consideration.
//
//



			var colorUtils  =       // changing this will change the name by wich the utility goes

(function(){

	var LITTLE_ENDIAN=testEndianness();



///////////////////////////////////////////
	function rgbToWebcolor(r,g,b){
		return ((r&15)<<8) | ((g&15)<<4) | ((b&15)<<0);
	}
	
	
///////////////////////////////////////////
	function rgbToBufcolor(r,g,b){	    // ? TODO: Remove the transissional Webcolor
		return WebcololToBufcolor(((r&15)<<8) | ((g&15)<<4) | ((b&15)<<0));
	}
		

///////////////////////////////////////////
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
			byte|=bits[i*4+0]<<4;
			byte|=bits[i*4+1]<<5;	
			byte|=bits[i*4+2]<<6;
			byte|=bits[i*4+3]<<7;		
		
		
			bytes[i]=byte;	
		
		}
		
		return "#"+bytes[0].toString(16)+bytes[0].toString(16)+bytes[1].toString(16)+bytes[1].toString(16)+bytes[2].toString(16)+bytes[2].toString(16);

}


///////////////////////////////////////////
function profileWebcolorToBufColorConversion(times){

	var randArray=[];

	for (var i=0; i<times; i++){

		randArray[i]=Math.floor(Math.random()*4096);  //preparing random numbers to be processed.

	}

	var lastTime=new Date();          // taking the time before

	for (var i=0; i<times; i++){
	
		randArray[i]=websafeToReal(randArray[i]);     //processing 

	}

	var timeSpent= new Date()-lastTime;   // taking the time after, and calculating the difference


	return timeSpent;   // milliseconds
}








return {
			"webcolorToBufcolor": webcolorToBufcolor,
			"webcolorToCsscolor": webcolorToCsscolor,
			"profileWebcolorToBufColorConversion": profileWebcolorToBufColorConversion,
			"rgbToWebcolor":rgbToWebcolor,
			"rgbToBufcolor":rgbToBufcolor
	}



})();





