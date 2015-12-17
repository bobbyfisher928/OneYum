angular.module('OneYum.factories', [])

.factory('User', function(){
	var user = {
		// id:
		// email:
		// firstname:
		// lastname:
		// start:
		// verified:
		// authorize:
		// req:
		// avatar:
		// perma:
		// sup:
		// part:
		// corp:
	}
	return {
		
	};
})

.factory('Identification', function(){
  var ident = {};
  var auth = {
    authorization: '',
    roles: ''
  }
  return {
    set: function(data) {
      ident = data;
      // auth.authorization = 
    },
    name: function() {
      return ident.fname + ' ' + ident.lname;
    }
  }
})

.factory('ContactService', function(){
	var Contacts = {
		'BobbyFisher': {
			name: 'Bobby Fisher',
			title: 'Founder, Director'
		},
		'JosephRoyal': {
			name: 'Joseph Royal',
			title: 'Founder, Operations'
		}
	};
	return {
		get: function(target) {
			var item;
			if (target === "BobbyFisher") {
				item = Contacts.BobbyFisher;
			} else if(target === "JosephRoyal") {
				item = Contacts.JosephRoyal;
			};
			console.log(item);
			return item;
		}
	};
})