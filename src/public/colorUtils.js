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

// The point of this whole thing was to transfer 12bit colors through WebSockets.
//



			var colorUtils  =       // changing this will change the name by wich the utility goes

(function(){

	var LITTLE_ENDIAN=testEndianness();



///////////////////////////////////////////
	function rgbToWebcolor(r,g,b){
		return ((r&15)<<8) | ((g&15)<<4) | ((b&15)<<0);
	}
	
	
///////////////////////////////////////////
	function rgbToBufcolor(r,g,b){	    // ? TODO: Remove the transitional Webcolor
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

///////////////////////////////////////////
	function bufcolorToWebcolor(n){   //doesn't work

		var bits = [(n>>> 0)&1,(n>>> 1)&1,(n>>> 2)&1,(n>>> 3)&1,(n>>> 4)&1,(n>>> 5)&1,(n>>> 6)&1,(n>>> 7)&1,
					(n>>> 8)&1,(n>>> 9)&1,(n>>>10)&1,(n>>>11)&1,(n>>>12)&1,(n>>>13)&1,(n>>>14)&1,(n>>>15)&1,
					(n>>>16)&1,(n>>>17)&1,(n>>>18)&1,(n>>>19)&1,(n>>>20)&1,(n>>>21)&1,(n>>>22)&1,(n>>>23)&1,
					(n>>>24)&1,(n>>>25)&1,(n>>>26)&1,(n>>>27)&1,(n>>>28)&1,(n>>>29)&1,(n>>>30)&1,(n>>>31)&1];
	
		//  ??? TODO: Remove the bits array altogether.
	
		var bytes=[];
	
		for (var i=0; i<4;i++){
		
			var byte=0;
		
			byte|=bits[i*8+0];
			byte|=bits[i*8+1]<<1;
			byte|=bits[i*8+2]<<2;
			byte|=bits[i*8+3]<<3;		
			byte|=bits[i*8+4]<<4;
			byte|=bits[i*8+5]<<5;	
			byte|=bits[i*8+6]<<6;
			byte|=bits[i*8+7]<<7;		
		
		
			bytes[i]=byte;	
		
		}
		
		
	
		alert(bytes[0]);  //little end alerts red
		
		
	
		//bytes[3]=255; // the alpha channel is opaque
	
		
		// ? TODO: Test big-endian systems!
	
		return bytes[0]| (bytes[1]<<8) | (bytes[2]<<16) | (bytes[3]<<24);

	}
	
	
///////////////////////////////////////////	
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


///////////////////////////////////////////
function profileWebcolorToBufColorConversion(times){

//////////////////// FIXME THings were refactored, and cod ehere hasn't changed. XXX 

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
			"rgbToBufcolor":rgbToBufcolor,
			"bufcolorToWebcolor":bufcolorToWebcolor
	}



})();





