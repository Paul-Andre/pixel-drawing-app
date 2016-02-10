//defining global objects and functions

var webcolorToBufcolor=colorUtils.webcolorToBufcolor;


var imageDataCreator=document.createElement("canvas").getContext("2d");  // I need to have a context to create imageData objects.

// this is the position and scaling of the image on screen
// "s" represents scaling
var position={x:0,y:0,s:1};


// this indicated what mouse buttons are pressed.
var mouse={1:false,2:false,3:false};

var currentColor={webcolor:0, bufcolor:colorUtils.webcolorToBufcolor(0), csscolor:"#000000"};

var tile;

