angular.module('OneYum.services', [])

.service('RefreshService', ['$q','$http','API','Identification', function($q,$http,API,Identification){
	return {
		refresh: function(data) {
			var d = $q.defer();
			$http.post(API.refresh,{authorize:data})
			.success(function(response) {
				console.log(response);
				if (response) {
					Identification.setIdent(response);
				};
				d.resolve(response);
			})
			.error(function(response) {
				console.log(response);
				d.reject(response);
			})
			return d.promise;
		}
	}
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

.service('RegisterService', ['$q','$http','API','AuthService', function($q,$http,API,AuthService){
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
			// console.log(response);
			if (AuthService.decode(response).Auth && AuthService.decode(response).Ident) {
				AuthService.setToken(response);
				console.log(AuthService.decode(response));
				d.resolve(AuthService.decode(response).Ident);
			} else {
				d.reject(response);
			};
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

.service('LoginService', ['$q','$http','API','Identification','AuthService', function($q,$http,API,Identification,AuthService){
	var login = function(data) {
		var d = $q.defer();
		// console.log(API.login,data);
		$http.post(API.login,data)
		.success(function(response) {
			if (AuthService.decode(response).Auth && AuthService.decode(response).Ident) {
				AuthService.setToken(response);
				console.log(AuthService.decode(response));
				d.resolve(response);
			} else {
				d.reject(response);
			};
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

.service('EmailContactService', ['$q','$http','API', function($q,$http,API){
	var send = function(data,owner) {
		var data = data;
		data.target = owner.name;
 		var d = $q.defer();
		$http.post(API.emailContact, data)
		.success(function(response) {
			d.resolve(response);
			console.log(response);
		})
		.error(function(response) {
			d.reject(response);
			console.log(response);
		})
		return d.promise;
	}

	return {
		send: send,

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

.service('HouseholdService', ['$q','$http','API','Identification','HouseHold','Locations', function($q,$http,API,Identification,HouseHold,Locations){
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
			console.groupCollapsed('HouseholdService Returned');
			console.log(response);
			if (response.length) {
				HouseHold.setHHold(response);
				d.resolve(response);
			} else {
				d.reject(response);
				console.log("No Households Assigned");
			};
			console.groupEnd();
		})
		.error(function(response) {
			console.groupCollapsed('HouseholdService Response Error');
			d.reject(response);
			console.log(response);
			console.groupEnd();
		});
		
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

			HouseHold.addHHold(response);
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

.service('SupplierService', ['$q','$http','API','Suppliers', function($q,$http,API,Suppliers){
	var getAll = function(data) {

	};

	var setAll = function(data) {

	}



	return {

		getAll: getAll,
		setAll: setAll
	}
}])

.service('AuthService', [ 'jwtHelper','Identification', function( jwtHelper , Identification){
	console.groupCollapsed("AuthService Entered");
	console.log('AuthService called');
	console.groupEnd();
	return {
		decode: function( token ) {
			console.log('AuthService decoding token');
			var tokenPayload = jwtHelper.decodeToken( token );
			return tokenPayload;
		},
		getToken: function() {
			var token = localStorage.getItem( 'oy' );
			if( token ) {
				console.log('Client token detected');
				return token;
			} else {
	    		console.log('Client token not detected');
				return false;
			}
		},
		setToken: function( token ) {
			if( token ) {
				console.log('AuthService setting token');
				return localStorage.setItem( 'oy', token );
			} else {
				console.error('AuthService can\'t set empty token');
				return false;
			}
		},
		isAuthorized: function() {
			var token = this.getToken();
			if( token ) {
				// Set user identity
				var data = this.decode( token );
			    return data;
			} else {
				return false;
			}
		},
		removeToken: function() {
			return localStorage.removeItem( 'oy' );
		}
	};
}])

.service('MemberService', ['$q','$http','API','Identification','Members', function($q,$http,API,Identification,Members){
	var get = function() {
		var data = {};
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