'use strict';

/* Controllers */

angular.module('myApp.controllers', []);

/**
 * The rootApplicationController ensures that the user is properly logged into the Instagram service
 */
 angular.module('myApp.controllers').controller('rootApplicationController',['$scope', '$location', 'instagramAccess', '$rootScope', 'instagramApi', function($scope, $location, instagramAccess, $rootScope, instagramApi){

 	if(typeof(Storage)=="undefined")
  	{
  		alert(" this App is incompatible with your current browser type/version ");
  	}

 	$rootScope.loggedIn= false;

 	function broadcastUserAuthenticated(){
 		$rootScope.loggedIn = true;
 		$rootScope.$broadcast('appLoggedIn');
 	}

 	var getUserInformationCallback = function(data){
 		// alert(JSON.stringify(data));
		$scope.userData = data;
		$rootScope.$broadcast('userDataFetched');
 	}

 	var userAuthenticatedCallback = function(data){
		console.log("Finished Grabbing the User Data");
		var access_token = data.access_token;
		// set the user =)
		//sessionStorage.access_token = access_token;
		sessionStorage.access_token = data.access_token;
		sessionStorage.userId = data.user.id;
		broadcastUserAuthenticated();
		$scope.user = data.user;
		instagramApi.getUserInfo(getUserInformationCallback);
	}

	/**
	 * Store information on the rootScope object
	 */
	$rootScope.getUser = function(){

	}



	function loginToInstagram(){
		var queryParams = window.location.search;
	 	 /**
	 	  * Do some custom query string calculations
	 	  * It seems that Angular is having trouble with this for some sort of reason
	 	  */
	 	  var queryEntries = queryParams.replace('?',"").split('&');
	 	  // check if the "code" exists
	 	  var code = undefined;

	 	  for(var index in queryEntries){
	 	  	var entry = queryEntries[index];
	 	  	if(entry.indexOf('=') > -1){
	 	  		var keyValuePair = entry.split("=");
	 	  		if(keyValuePair[0] == "code"){
	 	  			code = keyValuePair[1];
	 	  		}
	 	  	}
	 	  }

	 	  if(code!=undefined){
	 	  	instagramAccess.getOAuth(code, userAuthenticatedCallback);
	 	  }else{
	 	  	// This case shouldn't happen
	 	  	// do some stuff here --> send user to the 'login' page
	 	  	// because we can't go through the auth process without a "code" from instagram
	 	  	var search = $location.search(); 
	 	  	var redirectUrl = "/instagramLogin" + "?" + $.param(search) + $location.hash();
	 	  	window.location = redirectUrl;
	 	  }
	}

	if(sessionStorage.access_token == undefined || sessionStorage.userId == undefined){
		loginToInstagram();
	}else{
		instagramApi.getUserInfo(getUserInformationCallback);
		broadcastUserAuthenticated();
	}

  }]);

/**
 *
 */
angular.module('myApp.controllers').controller('userDisplayController',['$scope',function($scope){

	//  	$scope.$on

  	//alert("imageDisplayView")
	//console.log("image display view");
  	// there is some sort of image display view






  }]);

/**
 *
 */
angular.module('myApp.controllers').controller('imageDisplayView',['$scope', 'instagramApi', function($scope, instagramApi){

	//  	$scope.$on

  	//alert("imageDisplayView")
	console.log("image display view");
  	// there is some sort of image display view
  	function init(){

  		$scope.locationObject = instagramApi.getDefaultLocationObject();
  		$scope.locationObject.searchNearby(function(data){
  			$scope.locations = data;
  		});
  	}

  	if($scope.loggedIn){
  		init();
  	}else{
  		$scope.$on('appLoggedIn', function(){
  			// do stuff here
  			init();
  		});
  	}


  }]);