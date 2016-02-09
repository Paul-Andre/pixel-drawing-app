
var assert= require("assert");
var colorUtils=require("../src/colorUtils.js");

describe('colorUtils',function(){


	describe('webcolorToCsscolor',function(){
		it('should transform a 12 bit color number, "webcolor" to a css string',function(){
		
			assert.equal('#ffffff', colorUtils.webcolorToCsscolor(0xFFF));
			assert.equal('#00aabb', colorUtils.webcolorToCsscolor(0x0AB));
			assert.equal('#112233', colorUtils.webcolorToCsscolor(0x123));
		
		
		});
	});
	
	
});


