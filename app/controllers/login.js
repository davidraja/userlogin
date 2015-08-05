/*
* User login controller
*/
'use strict';

angular.module('NGUserApp.controllers').

	controller('LoginController', ['$scope', '$location', 'NGAPIService', '$timeout', function($scope, $location, NGAPIService, $timeout) {
		
		// user model
		$scope.NGUser = {};
		$scope.loginStatusMsg = '';
		
		// trigger login method
		$scope.NGUserLoginValidate = function() {
			$scope.loginStatusMsg = '';
			if($scope.NGUser.email && $scope.NGUser.password) {
				var loginParams = {}, 
					userInfo = {};

				// login request body
				userInfo['email'] = $scope.NGUser.email;
				userInfo['password'] = $scope.NGUser.password;
				loginParams['user'] = userInfo;

				// login api call
				NGAPIService.userSignOn(loginParams,
					function(response) {
						if(response.status === 'success') {
							$scope.loginStatusMsg = 'User login success';
						} else {
							$scope.loginStatusMsg = 'Invalid email id/password';
						}

						// hide the status message
						$timeout( function() {
							$scope.loginStatusMsg = '';
							$scope.NGUser = {};
						}, 1000);
				});
				
			} else {
				$scope.loginStatusMsg = 'Please enter all required details';
			}
		};

	}]);