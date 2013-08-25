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


curl \-F 'client_id=953d8c6c266a4c0b98c5d6f06f3898b2' \
    -F 'client_secret=74097c62af4249ee89ca825d6629d92f' \
    -F 'grant_type=authorization_code' \
    -F 'redirect_uri=http://localhost:8000/app/index.html' \
    -F 'code=321c1c53e38840eab1e7ec7fe67e8ce3' \https://api.instagram.com/oauth/access_token


https://api.instagram.com/oauth/authorize/?client_id=953d8c6c266a4c0b98c5d6f06f3898b2&response_type=code&redirect_uri=http://localhost:8000/app/index.html


http://localhost:8000/app/index.html?code=d6d0c1cbb7fe4cb4b1f98d98a89e54b1


{"access_token":"518542114.953d8c6.4ec95fcf3a2e429486100cacaa8f8e56","user":{"username":"jasonchangsf","bio":"","website":"","profile_picture":"http:\/\/images.ak.instagram.com\/profiles\/profile_518542114_75sq_1377142339.jpg","full_name":"Jason Chang","id":"518542114"}}



 	*/

 	var queryParams = ($location.absUrl()).replace("http://localhost:8000/app/index.html" , "");
//	code = code.replace("#?code", "");



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

//alert(data);

instagramAccess.getDefaultLocationObject().searchNearby(function(data){
	alert(JSON.stringify(data));
});

}
		instagramAccess.getOAuth(queryParams, callback);


  }]);

  angular.module('myApp.controllers').controller('imageDisplayView',[function(){



  }]);