var http = require("http");
var https = require('https');
var util = require("util");
var url = require("url");
var sys = require("sys");


var api = require('instagram-node').instagram();
var redirect_uri = 'http://localhost:8000/app/index.html';


// 518542114.953d8c6.4ec95fcf3a2e429486100cacaa8f8e56




/**
 * Redirects browser to the Instagram login page
 */
exports.instagramLogin = function(req, res) {
	api.use({
	  client_id: '953d8c6c266a4c0b98c5d6f06f3898b2',
	  client_secret: '74097c62af4249ee89ca825d6629d92f'
	});
	var url = api.get_authorization_url(redirect_uri, { scope: ['likes'], state: 'a state' });
	console.log(url);
	res.redirect(301, url);
};

/**
 * Grab the access_token and other basic user information:
 * name / picture etc.
 */
exports.instagramAuth = function(req, res) {

	api.use({
		client_id: '953d8c6c266a4c0b98c5d6f06f3898b2',
		client_secret: '74097c62af4249ee89ca825d6629d92f'
	});

	var query = url.parse(req.url).query;
	console.log("THIS IS THE QUERY STRING OBJ "+JSON.stringify(query));
	var code = query['code'];

	console.log("THIS IS THE QUERY STRING CODE "+code);


	api.authorize_user(code, redirect_uri, function(err, result) {
		if (err) {
			console.log(err);
			res.writeHead(500, {"Content-Type": "text/plain"});
			res.write("There was an error Authenticating to the Instagram Server: " + err );
			res.end();
		}else{
			res.write(JSON.stringify(result));
			res.end();
		}

	});
};


function instagramCall(req, res){

	var ig = require('instagram-node').instagram();
	
	var query = url.parse(req.url).query;
	console.log("THIS IS THE QUERY STRING OBJ "+JSON.stringify(query));
	var access_token = query['access_token'];

	console.log("THIS IS THE ACCESS TOKEN "+access_token);
	ig.use({ access_token: access_token });



/*

[{"latitude":48.8588443,"id":"3182106","longitude":2.2943506,"name":"La Parisienne"},{"latitude":48.858871,"id":"2862169","longitude":2.294351,"name":"Musee D'art Moderne De Paris"},{"latitude":48.858811431,"id":"8787963","longitude":2.294316016,"name":"Le Cardinal"},{"latitude":48.858729348,"id":"54115074","longitude":2.294340134,"name":"Eiffel Tower"},{"latitude":48.858725,"id":"30726193","longitude":2.294098,"name":"Vassili's Castel"},{"latitude":48.858604431,"id":"105946139","longitude":2.294339895,"name":"Eiffel Tower (Эйфелева башня)"},{"latitude":48.858626,"id":"1505374","longitude":2.294115,"name":"10 rue de Chartres"},{"latitude":48.858577175,"id":"102736558","longitude":2.294298898,"name":"Alexey Lushnikov Bar"},{"latitude":48.858902,"id":"7692265","longitude":2.293941,"name":"Carousel Gourmand"},{"latitude":48.859188573,"id":"23632934","longitude":2.294392507,"name":"Tour eiffel - to merge"},{"latitude":48.858604431,"id":"14196415","longitude":2.294763088,"name":"Presidentiellepocalypse"},{"latitude":48.858475234,"id":"1606204","longitude":2.294576168,"name":"Tour Eiffel"},{"latitude":48.859205581,"id":"54681397","longitude":2.294097484,"name":"Cars Rouges (Les)"},{"latitude":48.858447,"id":"5450860","longitude":2.294297218,"name":"Eiffel Tower"},{"latitude":48.85845895,"id":"21500268","longitude":2.294510625,"name":"ecoTrail Village"},{"latitude":48.858422,"id":"11168928","longitude":2.294343,"name":"Eiffel Tower"},{"latitude":48.858616515,"id":"9988390","longitude":2.293803117,"name":"エッフェル塔の最上階"},{"latitude":48.858466,"id":"106502319","longitude":2.294034,"name":"Top Of The Eiffel Tower"},{"latitude":48.858429715,"id":"19987744","longitude":2.294544681,"name":"eiffel tower jules verne"},{"latitude":48.858426128,"id":"1537464","longitude":2.294535153,"name":"Bar à Champagne"}]

*/

	ig.location_search({ lat: 48.858844, lng: 2.294351 },  function(err, result, limit) {


if(err){
	console.log("there is an error" + err + " " +err.error_message);


/*

err.code;                // code from Instagram
err.error_type;          // error type from Instagram
err.error_message;       // error message from Instagram

// If the error occurs while requesting the API
err.status_code;         // the response status code
err.body;    


*/
//err.message();

//err.retry();

}


var temp = JSON.stringify(result);
if(temp !== false){
	res.write(temp);
    res.end();
}else{
	res.write(result);
    res.end();
}



	});



/*
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

	*/
}



exports.instagramCall = instagramCall;