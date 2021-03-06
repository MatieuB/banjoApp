'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');

angular.module('myApp.services').factory('instagramAccess', ['$http',function($http){
	var factory= {};
	factory.loggedIn = false;
	factory.user = {};	
	factory.getOAuth=function(code, successCallback){
		if(!factory.loggedIn){
			$http.get('/instagramAuth?code='+code).success(function(data){
				factory.loggedIn = true;
				factory.user = data;
				factory.accessToken = data.access_token;
				successCallback(data);
			}).error(function(data, status, headers, config){
				console.log(JSON.stringify(data));
				alert("there was an error");
			});
		}
	}
	return factory;
}

]);

angular.module('myApp.services').factory('instagramApi', ['$http', 'instagramAccess',function($http, instagramAccess){
	var factory= {};

	function Location(lat, lng, distance){
		this.lat=lat;
		this.lng=lng;
		this.distance=distance;
	};

	Location.prototype.getQueryString = function(){
		var queryString = "?access_token="+sessionStorage.access_token;
		for(var index in this){
			if(typeof this[index] !== 'function'){
				queryString += '&';
				queryString += index;
				queryString += '=';
				queryString += this[index];
			}
		}
		return queryString;
	}


	// Paris by default
	// Location.prototype.lat = 48.858844;
	// Location.prototype.lng = 2.294351;
	// Location.prototype.distance = 1000;

	Location.prototype.searchNearby = function(successCallback, failureCallback){
		var queryString = this.getQueryString();
		$http.get('/locationSearch' + queryString).success(function(data){
			successCallback(data);
		}).error(function(data, status, headers, config){
			console.log(JSON.stringify(data));
			failureCallback();
		});
	}

	// grab paris
	// this is hardcoded and bad =(
	factory.getDefaultLocationObject = function(){
		return new Location(48.858844, 2.294351, 1000);
	}

	factory.getUserInfo=function(successCallback){
		$http.get('/instagramUserInfo?access_token=' + sessionStorage.access_token + '&user_id=' + sessionStorage.userId )
			.success(function(data){
				successCallback(data);
			}).error(function(data, status, headers, config){
				console.log(JSON.stringify(data));
				alert("there was an error");
			});
	}

	factory.getUserLoggedIn=function(successCallback, failureCallback){
		$http.get('/instagramUserLoggedIn?access_token=' + sessionStorage.access_token )
			.success(function(data){
				successCallback(data);
			}).error(function(data, status, headers, config){
				console.log(JSON.stringify(data));
				alert("there was an error");
				failureCallback();
			});
	}


	factory.getMediaBySite=function(siteId, successCallback, failureCallback){
		
		$http.get('/getMediaByLocationID?access_token=' + sessionStorage.access_token + "&id=" + siteId)
			.success(function(data){
				successCallback(data);
			}).error(function(data, status, headers, config){
				console.log(JSON.stringify(data));
				alert("there was an error");
				failureCallback();
			});
		

	//	successCallback(" Adding pretend data \n\n\n\n\n\n\n\n\n\n   end of pretend data");

	}

	return factory;

}


]);

