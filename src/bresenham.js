var fs=require("fs");
var filedata = fs.readFileSync('public/bresenham.js','utf8');
eval(filedata);

module.exports=bresenham;
