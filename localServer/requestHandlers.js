var http = require("http");

var https = require('https');

var util = require("util");
var url = require("url");
var sys = require("sys");

var querystring = require('querystring');

/**

curl \-F 'client_id=CLIENT-ID' \
    -F 'client_secret=CLIENT-SECRET' \
    -F 'grant_type=authorization_code' \
    -F 'redirect_uri=YOUR-REDIRECT-URI' \
    -F 'code=CODE' \https://api.instagram.com/oauth/access_token






*/

function instagramAuth(req, res){

	var options = {
		host: "api.instagram.com",
		path: "/oauth/access_token",
		method: "POST",
		port: 443
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

	var query = url.parse(req.url).query;
	console.log("THIS IS THE QUERY STRING OBJ "+JSON.stringify(query));
	var code = query['code'];
	console.log("THIS IS THE QUERY STRING CODE "+code);


	var post_data = querystring.stringify({
		'client_id':"953d8c6c266a4c0b98c5d6f06f3898b2",
		'client_secret':"74097c62af4249ee89ca825d6629d92f",
		'grant_type':'authorization_code',
		'redirect_uri':"http://localhost:8000/app/index.html",
		'code':code
  	});

/*
	var data = {
		
	};
*/
	var instagramRequest = https.request(options, callback).on('error', function(e){
		 		console.log("Got error: " + e.message);
		 		// Do stuff here to indicate that there was a problem.
		 		// =)

			//	  console.log("Error: " + hostNames[i] + "\n" + e.message); 
   console.log( e.stack );


			});

	instagramRequest.write(post_data);







}


function instagramCall(req, res){

	var pathname = url.parse(req.url).pathname;
	pathname = pathname.replace('/instagram','');
	var options = {
		host: "https://api.instagram.com/v1/",
		path: pathname,
		method: req.method,
		port: 443
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

	var instagramRequest = http.request(options, callback).on('error', function(e){
		 console.log("Got error: " + e.message);
	});

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
exports.instagramAuth = instagramAuth;
exports.instagramCall = instagramCall;