var fs = require('fs');

// Read and eval library
var filedata = fs.readFileSync(__dirname+'/public/coreUtils.js','utf8');
eval(filedata);

var filedata = fs.readFileSync(__dirname+'/public/colorUtils.js','utf8');
eval(filedata);

module.exports=colorUtils;
exports.testEndianness=testEndianness;

