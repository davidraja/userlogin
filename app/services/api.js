/*
* Common API call services
*/
'use strict';

angular.module('NGUserApp.services').
	
	factory('NGAPIService', ['$http', '$q', function($http, $q) {
		
		var NGAPI = {};
		// api host url
		var hostAPIUrl = 'app/partials';

		// post request method api call
		NGAPI.postRequest = function(method, reqBody, successCallback, errorCallback) {
			var deferred = $q.defer();

			var url = hostAPIUrl + '/' + method + '?timestamp=' + new Date().getTime();

			$http({
				method: 'POST',
				url: url,
				data: JSON.stringify(reqBody),
				header: {
					'Access-Control-Allow-Headers' : 'x-requested-with',
					'Accept' : 'application/json; indent=4',
					'Content-Type' : 'application/json',
					'Access-Control-Allow-Origin' : '*'
				}
			}).success(function(response) {
				deferred.resolve(response);
			}).error(function() {
				deferred.reject('Technical problem');
			});

			return deferred.promise;
		};
		
		// user login api method
		NGAPI.userSignOn = function(bodyRequest, successCallback, errorCallback) {
			NGAPI.postRequest('user.json', bodyRequest)
				.then(function(response) {
					if(successCallback)
						successCallback(response);
				}, function(err) {
					if(errorCallback)
						errorCallback(err);
				});
		};
		
		return NGAPI;
	}]);