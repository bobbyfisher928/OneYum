angular.module('OneYum.services', [])

.service('SupplierRegisterService', ['$q','$http','API', function($q,$http,API){
	var validateKey = function(data) {
		var d = $q.defer();

		$http.post(API.validateSupKey,data)
		.success(function(response) {
			d.resolve(response);
			console.log(response);
		})
		.error(function(error) {
			d.reject(error);
			console.log(error);
		})
		return d.promise;
	}

	return {
 		validateKey: validateKey
	}
}])

.service('RegisterService', ['$q','$http','API', function($q,$http,API){
	var check = function(data) {
		var request = {request: data};
		var d = $q.defer();
		// console.log(API.email);
		$http.post(API.email,request)
		.success(function(response) {
			d.resolve(response);
			console.log(response);
		})
		.error(function(error) {
			d.reject(error);
			console.log(error);
		})
		return d.promise;
	};
	var register = function(data) {

		var d = $q.defer();
		// console.log(API.register,data);
		$http.post(API.register,data)
		.success(function(response) {
			d.resolve(response);
			console.log(response);
		})
		.error(function(error) {
			d.reject(error);
			console.log(error);
		})
		return d.promise;
	}
	return {
		check: check,
		register: register,
	}
}])

.service('LoginService', ['$q','$http','API', function($q,$http,API){
	var login = function(data) {
		var d = $q.defer();
		// console.log(API.login,data);
		$http.post(API.login,data)
		.success(function(response) {
			d.resolve(response);
			console.log(response);
		})
		.error(function(error) {
			d.reject(error);
			console.log(error);
		})
		return d.promise;
	}

	return {
		login: login
	}
}])

.service('Popup', ['$ionicPopup', function($ionicPopup){

	return {
		alert: function(data) {
			var popup = $ionicPopup.alert({
				title: data.title,
				template: data.message
			});
			return popup;
		},
		confirm: function(data) {
			var confirmPopup = $ionicPopup.confirm({
		     	title: data.title,
				template: data.message
		   });
		}
	}
	
}])