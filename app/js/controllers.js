'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', [ function() {

var a =1;

  }])
  .controller('MyCtrl2', [function() {

  }]);


 angular.module('myApp.controllers').controller('rootApplicationController',['$scope', '$location', 'instagramAccess', function($scope, $location, instagramAccess){
 	// Assume that the person navigates to app via:
  	var temp = $location.path();
  	$scope.access_token= temp.replace("/", "").split('=')[1];
  	$scope.location = instagramAccess.getDefaultLocationObject();

  //	instagramAccess.getDefaultLocationObject();
	var locationSearch = function(){
		alert('hello');
	};
 	
 	$scope.location.searchNearby($scope.access_token, locationSearch);

  }]);

  angular.module('myApp.controllers').controller('imageDisplayView',[function(){



  }]);