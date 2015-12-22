angular.module('OneYum.services', [])

.service('RefreshService', ['$q','$http', function($q,$http){
	
}])

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
			// console.log(error);
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

.service('PostService', ['Posts','$q','$http', function(Posts,$q,$http){
	
	return {

	}
}])

.service('HouseholdService', ['$q','$http','API','Identification','Locations', function($q,$http,API,Identification,Locations){
	var get = function() {
		var data = {};
		data.id = Identification.getIdent().id;
		var d = $q.defer();
		var request = {
			action: 'GET',
			info: data,
		};
		// console.log(data);
		$http.post(API.household,request)
		.success(function(response) {
			// console.log(response);
			Identification.setHHold(response);
			d.resolve(response);
		})
		.error(function(response) {
			d.reject(response);
			console.log(response);
		})
		return d.promise;
	};

	var remove = function(data) {
		var d = $q.defer();
		var request = {
			action: 'REMOVE',
			info: data,
		};
		$http.post(API.household,request)
		.success(function(response) {
			d.resolve(response);
			console.log(response);
		})
		.error(function(response) {
			d.reject(response);
			console.log(response);
		})
		return d.promise;
	};

	var update = function(data) {
		var d = $q.defer();
		var request = {
			action: 'EDIT',
			info: data,
		};
		$http.post(API.household,request)
		.success(function(response) {
			d.resolve(response);
			console.log(response);
		})
		.error(function(response) {
			d.reject(response);
			console.log(response);
		})
		return d.promise;
	};

	var add = function(data) {
		var d = $q.defer();
		data.id = Identification.getIdent().id;
		var request = {
			action: 'ADD',
			info: data,
		};
		console.log(request);
		$http.post(API.household,request)
		.success(function(response) {
			console.log(response);

			Identification.addHHold(response);
			d.resolve(response);
		})
		.error(function(response) {
			d.reject(response);
			console.log(response);
		})
		return d.promise;
	};

	return {
		get: get,
		remove: remove,
		update: update,
		add: add
	};
}])

.service('MemberService', ['$q','$http','API','Identification','Members', function($q,$http,API,Identification,Members){
	var get = function() {
		var data = {};
		data.hid = Identification.getHHold()[0].hid;
		var d = $q.defer();
		var request = {
			action: 'GET',
			info: data,
		};
		console.log(data);
		$http.post(API.members,request)
		.success(function(response) {
			console.log(response);
			d.resolve(response);
			Members.set(response);
		})
		.error(function(response) {
			d.reject(response);
			console.log(response);
		})
		return d.promise;
	};

	var remove = function(data) {
		var d = $q.defer();
		var request = {
			action: 'REMOVE',
			info: data,
		};
		$http.post(API.members,request)
		.success(function(response) {
			d.resolve(response);
			console.log(response);
		})
		.error(function(response) {
			d.reject(response);
			console.log(response);
		})
		return d.promise;
	};

	var update = function(data) {
		var d = $q.defer();
		var request = {
			action: 'EDIT',
			info: data,
		};
		$http.post(API.members,request)
		.success(function(response) {
			d.resolve(response);
			console.log(response);
		})
		.error(function(response) {
			d.reject(response);
			console.log(response);
		})
		return d.promise;
	};

	var add = function(data) {
		var d = $q.defer();
		data.id = Identification.getIdent().id;
		data.name = Identification.getIdent().fname + ' ' + Identification.getIdent().lname;
		var request = {
			action: 'ADD',
			info: data,
		};
		console.log(request);
		$http.post(API.members,request)
		.success(function(response) {
			console.log(response);
			Members.set(response);
			d.resolve(response);
		})
		.error(function(response) {
			d.reject(response);
			console.log(response);
		})
		return d.promise;
	};

	return {
		get: get,
		remove: remove,
		update: update,
		add: add
	};
}])

.service('LocationService', ['Locations','$q','$http','API','Identification', function(Locations,$q,$http,API,Identification){
	var get = function(data) {
		var d = $q.defer();
		var request = {
			action: 'GET',
			info: data,
		};
		$http.post(API.location,request)
		.success(function(response) {
			d.resolve(response);
			// console.log(response);
			Locations.set(response.locations);
		})
		.error(function(response) {
			d.reject(response);
			console.log(response);
		})
		return d.promise;
	};

	var remove = function(data) {
		var d = $q.defer();
		var request = {
			action: 'REMOVE',
			info: data,
		};
		$http.post(API.location,request)
		.success(function(response) {
			d.resolve(response);
			console.log(response);
		})
		.error(function(response) {
			d.reject(response);
			console.log(response);
		})
		return d.promise;
	};

	var update = function(data) {
		var d = $q.defer();
		var request = {
			action: 'EDIT',
			info: data,
		};
		$http.post(API.location,request)
		.success(function(response) {
			d.resolve(response);
			console.log(response);
		})
		.error(function(response) {
			d.reject(response);
			console.log(response);
		})
		return d.promise;
	};

	var add = function(data) {
		var d = $q.defer();
		var request = {
			action: 'ADD',
			info: data,
		};
		console.log({req:request});
		$http.post(API.location,request)
		.success(function(response) {
			d.resolve(response);
			console.log(response.locations,response.hhold);
			Locations.set(response.locations);
		})
		.error(function(response) {
			d.reject(response);
			console.log(response);
		})
		return d.promise;
	}

	return {
		get: get,
		remove: remove,
		update: update,
		add: add
	}	
}])