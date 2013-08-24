var http = require("http");
var util = require("util");
var url = require("url");
var sys = require("sys");

var instagramHost = "https://api.instagram.com/v1/";

function instagramCall(req, res){

	var pathname = url.parse(req.url).pathname;
	pathname = pathname.replace('/instagram','');
	var options = {
		host: instagramHost,
		path: pathname,
		method: request.method,
		port: 80
	};

	var callback = function(instagramResponse){
		res.writeHead(200, {"Content-Type": "text/plain"});
		instagramResponse.on('data', function(chunk){
			res.write(chunk);
		});
		instagramResponse.on('end', function(){
			res.end();
		});
	};

	var instagramRequest = http.request(options, callback);
	if(req.method == 'POST' || req.method == 'PUT'){
		req.addListener('data', function(chunk){
			instagramRequest.write(chunk);
		});
		req.addListener('end', function(){
			instagramRequest.end();
		});
	}else{
		instagramRequest.end();
	}
}

exports.instagramCall = instagramCall;