//defining global objects and functions

var webcolorToBufcolor=colorUtils.webcolorToBufcolor;


var imageDataCreator=document.createElement("canvas").getContext("2d");  // I need to have a context to create imageData objects.

// this is the position and scaling of the image on screen
// "s" represents scaling
var position={x:0,y:0,s:1};


var mouse={1:false,2:false,3:false};

//color defs
var initialPink=0xf45;


//currentColor
var currentColor=0x122;

var tile;

var wsPort = 9100;
var imagePort = 9101;
