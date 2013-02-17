///////////////////////////////////
// 
//   
//         coreUtils.js
//
//
//   This is a really important file! It provides functions that alot of other packages use!
//
//


////////////////////////////////////////////
	function testEndianness(){   // true means little endian
		var buffer= new ArrayBuffer(2);
		var a8 = new Uint8Array(buffer);
		var a16 = new Uint16Array(buffer);
		a8[0]=1;
		return a16[0]==1;
	}
