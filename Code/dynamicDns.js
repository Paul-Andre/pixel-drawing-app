var https = require('https');
var http = require('http');


var ip='~~~~~'

function initDnsUpdater(){

setInterval(function(){
http.get("http://myip.dnsdynamic.org/",function(res){

res.setEncoding('utf8');
res.on('data',function(d){

//console.log(d);

if (d!=ip){

		console.log("Changing IP from "+ip+" to "+d)

		https.get('https://chapeaufeutre@gmail.com:DynamicSystem@www.dnsdynamic.org/api/?hostname=pixels.dns53.biz &myip='+d, function(res) {
		//  console.log("statusCode: ", res.statusCode);
		 // console.log("headers: ", res.headers);
			res.setEncoding('utf8');
		  res.on('data', function(dd) {
			//process.stdout.write(dd);
			
			if(dd.indexOf("good")!=-1){
			
				console.log("Successfully changed IP");
			
			}
		  });

		}).on('error',console.error);
		
		ip=d
	}

});
}).on('error',console.error);
},10000)
};
//initDnsUpdater();

module.exports=initDnsUpdater;
