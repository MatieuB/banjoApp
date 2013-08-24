var url = require("url");
var requestHandlers = require("./requestHandlers"); 

var exactMatches = {};

var subpaths = {};
subpaths["/instagram"] = requestHandlers.instagramCall;


function route(req, res, defaultHandler){
	var pathname = url.parse(req.url).pathname;
	console.log("About to route a request for " + pathname);
	if(typeof exactMatches[pathname] == 'function'){

	}else{
		var matches = false;
		for( var subpath in subpaths ){
			if(pathname.indexOf(subpath) == 0){
				matches = true;
				subpaths[subpath](req, res);
			}
		}

		if(!matches){
			defaultHandler();
		}
	}
}


exports.route = route;