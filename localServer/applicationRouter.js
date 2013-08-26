var url = require("url");
var requestHandlers = require("./requestHandlers"); 

var exactMatches = {};
exactMatches["/instagramAuth"] = requestHandlers.instagramAuth;
exactMatches["/instagramLogin"] = requestHandlers.instagramLogin;
exactMatches["/instagramUserInfo"] = requestHandlers.instagramUserInfo;
exactMatches["/locationSearch"] = requestHandlers.locationSearch;

exactMatches["/instagramUserLoggedIn"] = requestHandlers.instagramUserLoggedIn;
exactMatches["/getMediaByLocationID"] = requestHandlers.getMediaByLocationID;


var subpaths = {};
subpaths["/instagram"] = requestHandlers.instagramCall;


function route(req, res, defaultHandler){
	var pathname = url.parse(req.url).pathname;
	console.log("About to route a request for " + pathname);
	if(typeof exactMatches[pathname] == 'function'){
		exactMatches[pathname](req, res);
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