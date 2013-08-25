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

518542114.953d8c6.4ec95fcf3a2e429486100cacaa8f8e56



curl https://api.instagram.com/v1/locations/search?access_token=518542114.953d8c6.4ec95fcf3a2e429486100cacaa8f8e56&lat=48.858844&lng=2.294351


*/

	/*
		https://api.instagram.com/v1/locations/search?distance=1000&lat=48.858844&lng=2.294351&access_token=518542114.f59def8.94b0572e8b0544509481c30f939e084b
	 */

	Location.prototype.searchNearby = function(successCallback){

/*

, 
			{ 	lat:this.lat,
				access_token:factory.accessToken,
				lng:this.lng,
				dst:this.dst
			}
*/

//instagram
// /locations/search?lat='+this.lat+'&lng='+this.lng+'&dst='+this.dist+'&access_token='+factory.accessToken

		$http.get('/instagram?access_token=' + factory.accessToken).success(function(data){
				successCallback(data);
			});
	}

	// grab paris
	// this is hardcoded and bad =(
	factory.getDefaultLocationObject = function(){
		return new Location(48.858844, 2.294351, 1000);
	}

	factory.setAccessToken = function(token){
		factory.accessToken = token;
	}

//	


//    /instagramAuth

	factory.getOAuth=function(queryString, successCallback){
		// var params = {code:code};
    	//var str = ;
	//	var queryString = $.param(params);

		$http.get('/instagramAuth'+queryString).success(function(data){

			factory.accessToken = data.access_token;

			successCallback(data);
		}).error(function(){

			alert("there was an error");

		});

	}


	return factory;

}


]);