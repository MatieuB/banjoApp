'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');



angular.module('myApp.services').factory('instagramAccess', ['$http',function($http){
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

	/*
		https://api.instagram.com/v1/locations/search?distance=1000&lat=48.858844&lng=2.294351&access_token=518542114.f59def8.94b0572e8b0544509481c30f939e084b
	 */

	Location.prototype.searchNearby = function(accessToken, successCallback){
		$http.post('https://api.instagram.com/v1/locations/search', 
			{ 	lat:this.lat,
				access_token:accessToken,
				lng:this.lng,
				dst:this.dst
			}).success(function(data){
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