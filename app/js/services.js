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

				sessionStorage.access_token = data.access_token;

				factory.accessToken = data.access_token;
				successCallback(data);
			}).error(function(){
				alert("there was an error");
			});
		}
	}

	return factory;

}


]);




angular.module('myApp.services').factory('instagramApi', ['$http', 'instagramAccess',function($http, instagramAccess){
	var factory= {};

	function Location(lat, lng, dist){
		this.lat=lat;
		this.lng=lng;
		this.dist=dist;
	};

	// Paris by default
	// Location.prototype.lat = 48.858844;
	// Location.prototype.lng = 2.294351;
	// Location.prototype.dist = 1000;

	Location.prototype.searchNearby = function(successCallback){
		$http.get('/instagram?access_token=' + instagramAccess.accessToken).success(function(data){
				successCallback(data);
		});
	}

	// grab paris
	// this is hardcoded and bad =(
	factory.getDefaultLocationObject = function(){
		return new Location(48.858844, 2.294351, 1000);
	}



	return factory;

}


]);

