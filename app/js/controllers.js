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
		//console.log("Finished Grabbing the User Data");
		var access_token = data.access_token;
		// set the user =)
		//sessionStorage.access_token = access_token;
		sessionStorage.access_token = data.access_token;
		sessionStorage.userId = data.user.id;

		// After completing the Authentication 
		// flow set by Instagram make sure that
		// any sort of odd search params are cleared. 
		window.location.search = "";
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

	 	  if(code!==undefined){
	 	  	instagramAccess.getOAuth(code, userAuthenticatedCallback);
	 	  }else{

	 	  	// This case shouldn't happen
	 	  	// do some stuff here --> send user to the 'login' page
	 	  	// because we can't go through the auth process without a "code" from instagram
	 	  	var search = $location.search(); 
	 	  	var redirectUrl = "/instagramLogin" ;//+ "?" + $.param(search) + $location.hash();
	 	  	window.location = redirectUrl;
	 	  }
	}

	if(sessionStorage.access_token == undefined || sessionStorage.userId == undefined){
		loginToInstagram();
	}else{

		//	window.location.search="";
		//	broadcastUserAuthenticated();

		instagramApi.getUserInfo(getUserInformationCallback);
		// broadcastUserAuthenticated();
		broadcastUserAuthenticated();


		/*
		instagramApi.getUserLoggedIn(function(){
			// success
			// make sure that there are no weird query string params
			if(window.location.search.length > 0){
				window.location.search="";
			}else{
				broadcastUserAuthenticated();
			}

		},function(){
			//failure
			loginToInstagram();
		}

		);
		*/
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

angular.module('myApp.controllers').controller('worldLocationsController',['$scope', 'instagramApi', function($scope, instagramApi){

  	//alert("imageDisplayView")
	console.log("locationController");

	function loadLocationData(){
  		$scope.locations = new Array();
		$scope.locations.push( instagramApi.getDefaultLocationObject() );  		
  	}

  	// there is some sort of image display view
  	if($scope.loggedIn){
  		loadLocationData();
  	}else{
  		$scope.$on('appLoggedIn', function(){
  			// do stuff here
  			loadLocationData();
  		});
  	}



  }]);

angular.module('myApp.controllers').controller('locationSiteController',['$scope', 'instagramApi', '$timeout', function($scope, instagramApi, $timeout){

	$scope.init = function(site){
  		 $scope.site = site;
  		 $scope.siteCompletelyLoaded=true;
  	}

 }]);
/**
 *
 */
angular.module('myApp.controllers').controller('locationRadiusController',['$scope', 'instagramApi', '$timeout', function($scope, instagramApi, $timeout){


  	$scope.allSitePosts = new Array();

  	$scope.loadedSites = new Array();
  	$scope.loadingSiteIds = new Array();


  	$scope.windowScrollCallback = (function(scope){
  		return function() {
  			var documentHeight = $(document).height();
  			var windowPosition = $(window).height() + window.scrollY;
  			if(windowPosition > (documentHeight - 10)){
  				scope.fetchSites();
  				scope.$apply();
  			}
		}
	})($scope);

  	function dataLoadedComplete(){
		$scope.fetchSites();
		$(window).scroll($scope.windowScrollCallback);
  	}

  	$scope.fetchSites= function(){
  		if($scope.loadingSiteIds.length == $scope.loadedSites.length){
  			if($scope.sites.length > $scope.loadingSiteIds.length){
  				var nextSiteId = $scope.sites[$scope.loadingSiteIds.length].id;
  				$scope.fetchSiteById(nextSiteId);
  			}
  		}
  	}

  	function getSiteSuccessCallback(id){
  		return function(posts){
  			$scope.dataIsLoading = false;
  			var siteData=undefined;
  			for(var index in $scope.sites){
  				var site = $scope.sites[index];
  				if(site.id == id){
  					siteData=site;
  				}
  			}

  			var addedData = {id:id, posts:posts, data:siteData};
			$scope.loadedSites.push(addedData);

			for(var sitePost in posts){
				$scope.allSitePosts.push(posts[sitePost]);
			}

			function fetchMoreData(){
				if($scope.loadingSiteIds.length == $scope.loadedSites.length){
					var docHeight = $(document).height();
					var windowHeight = $(window).height();
					// If the window height is the same as the 
					// document height, then we should load more data
					if(docHeight < windowHeight + 10){
						$scope.fetchSites();
						$scope.$apply();
					}	
				}
			}
			$timeout(fetchMoreData, 0);
  		}
  	}

  	$scope.fetchSiteById=function(id){
  		$scope.dataIsLoading = true;
  		$scope.loadingSiteIds.push(id);
  		var successCallback = getSiteSuccessCallback(id);
  		instagramApi.getMediaBySite(id, successCallback);
  		//console.log("fetching more posting data");
  	}
	
	function loadLocationSucess(data){
		$scope.sites = data;
  		dataLoadedComplete();
	}

	function loadLocationFailure(){
		// try 3 times
		$scope.searchAttempts ++;
		if($scope.searchAttempts  >= 3){
			alert("Unable to reach the Instagram servers. Please try again. ");
		}else{
			$scope.locationObject.searchNearby(loadLocationSucess, loadLocationFailure);
		}
	}

  	$scope.init = function(location){
  		// $scope.locationObject = instagramApi.getDefaultLocationObject();
  		$scope.searchAttempts = 0;
  		console.log(' controller is inited ');
  		$scope.locationObject = location;	
  		$scope.locationObject.searchNearby(loadLocationSucess, loadLocationFailure);
  	}


  }]);



