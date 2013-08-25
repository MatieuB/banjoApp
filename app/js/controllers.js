'use strict';

/* Controllers */

angular.module('myApp.controllers', []);

/**
 * The rootApplicationController ensures that the user is properly logged into the Instagram service
 */
 angular.module('myApp.controllers').controller('rootApplicationController',['$scope', '$location', 'instagramAccess', function($scope, $location, instagramAccess){
 	// ($location.absUrl()).replace("http://localhost:8000/app/index.html" , "");
 	// use Local session storage to store 
 	// the auth token
 	if(typeof(Storage)=="undefined")
  	{
  		// Yes! localStorage and sessionStorage support!
  		// Some code.....
  		alert(" this App is incompatible with your current browser type/version ");
  	}

 	$scope.loggedIn= false;
 	var callback = function(data){
		console.log("auth callback just finished ");
		var access_token = data.access_token;
		// set the user =)
		//	sessionStorage.access_token = access_token;
		$scope.loggedIn= true;
		$scope.user = data;
	}


	if(sessionStorage.access_token == undefined){
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
	 	  	instagramAccess.getOAuth(code, callback);
	 	  }else{
	 	  	// This case shouldn't happen
	 	  	// do some stuff here --> send user to the 'login' page
	 	  	// because we can't go through the auth process without a "code" from instagram
	 	  }
		
	}else{
		//alert("using session stored auth token");

		if($scope.user == undefined){
			// grab the use information
			// =)

		//	alert(' there is no defined user ');


		}
	}




  }]);

	  angular.module('myApp.controllers').controller('imageDisplayView',['$scope',function($scope){

	//  	$scope.$on

  	//alert("imageDisplayView")
	console.log("image display view");
  	// there is some sort of image display view

  }]);