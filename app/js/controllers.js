'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', [ function() {

var a =1;

  }])
  .controller('MyCtrl2', [function() {

  }]);


 angular.module('myApp.controllers').controller('rootApplicationController',['$scope', '$location', 'instagramAccess', function($scope, $location, instagramAccess){
 	

 	/*

https://api.instagram.com/oauth/authorize/?client_id=953d8c6c266a4c0b98c5d6f06f3898b2&response_type=code&redirect_uri=http://localhost:8000/app/index.html





https://api.instagram.com/oauth/authorize/?client_id=953d8c6c266a4c0b98c5d6f06f3898b2&response_type=code&redirect_uri=http://localhost:8000/app/index.html


http://localhost:8000/app/index.html?code=d6d0c1cbb7fe4cb4b1f98d98a89e54b1



 	*/

 	var code = ($location.absUrl()).replace("http://localhost:8000/app/index.html?" , "").split("=")[1];
	code = code.replace("#?code", "");



 	// Assume that the person navigates to app via:
  //	var temp = $location.path();
  	//$scope.access_token= temp.replace("/", "").split('=')[1];
  //	instagramAccess.setAccessToken(encodeURIComponent($scope.access_token));



  	$scope.location = instagramAccess.getDefaultLocationObject();

  //	instagramAccess.getDefaultLocationObject();
	var locationSearch = function(data){
		alert('hello');
	};
 	


 //	$scope.location.searchNearby(locationSearch);
var callback = function(data){

alert(data);
}
		instagramAccess.getOAuth(code, callback);


  }]);

  angular.module('myApp.controllers').controller('imageDisplayView',[function(){



  }]);