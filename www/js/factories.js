angular.module('OneYum.factories', [])

.factory('Members', function(){
	var members = [];
	return {
		set: function(data) {
			members = data;
			console.log(data);
		},
		getAll: function() {
			return members;
		},
		add: function(data) {
			if (members.length) {
				members = data;
			} else {
				members[members.length] = data;
			};
			console.log(members);
		}
	};
})

.factory('Identification', function(){
  var ident = {
  	avatar: "",
	corp: "0",
	email: "bobbyfisher@me.com",
	fname: "Bobby",
	id: "32",
	lname: "Fisher",
	part: "0",
	perma: "53toZhduTYd7zge3Vg7nBJMV39FVVAsw",
	start: "2015-12-17 10:00:35",
	sup: "0",
	verified: "0"
  };
  var hhold = [];
  var auth = {
    authorization: '',
    roles: ''
  }
  return {
    setIdent: function(data) {
      ident = data;
      // auth.authorization = 
    },
    setHHold: function(data) {
    	// console.log(data);
      	hhold = data;
      	// console.log(hhold);
      // auth.authorization = 
    },
    addHHold: function(data) {
    	hhold[hhold.length] = data;
    	return hhold;
    },
    name: function() {
      return ident.fname + ' ' + ident.lname;
    },
    getIdent: function() {
    	return ident;
    },
    getHHold: function() {
    	// console.log(hhold);
    	return hhold;
    }
  }
})

.factory('Locations', function(){
	var Locations = [];
	var LocationObj = {
		name:'',
		street:'',
		city: '',
		state:'',
		zip: ''
	}
	return {
		build: function() {
			return LocationObj;
		},
		get: function() {
			return Locations;
		},
		set: function(data) {
			Locations = data;
			return Locations;
		},
		add: function(data) {
			Locations[Locations.length] = data;
			return Locations;
		}
	};
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
			// console.log(item);
			return item;
		}
	};
})

.factory('Posts', function(){
	var Posts = [{
		pid: 0,
		avatar: '',
		timestamp: '12/10/2015',
		source: 'OneYum',
		title: 'Welcome Tutorial',
		description: 'Take this tutorial to get yourself aquainted with your new found freedoms.',
		action: 'Get comfortable with OneYum',
		viewed: false
	},
	{
		pid: 1,
		avatar: '',
		timestamp: '12/10/2015',
		source: 'OneYum',
		title: 'A Simple Base',
		description: 'It is our goal to provide you with a healthy foundation affordably.',
		action: 'Read more to learn about our meals',
		viewed: false
	}];
	return {
		get: function() {
			return Posts;
		},
		updateViewed: function(data) {
			// console.log(data);
			for (var i = 0; i < Posts.length; i++) {
				console.log(Posts[i],data);
				if(parseInt(Posts[i].pid) === parseInt(data)) {
					console.log(Posts[i]);
					Posts[i].viewed = true;
				}
			};
			return Posts;
		}
	};
})

.factory('Activity', function(){
	var  Activity= [{
		pid: 0,
		avatar: '',
		timestamp: '12/10/2015',
		source: 'OneYum',
		title: 'Thank you!',
		description: 'We all here at OneYum want to thank you so much. The more meals we provide the more we can increase opportunities, local food production, and minimize environmental effects caused by the current food system.',
		action: 'Learn about of future plans',
		viewed: false
	},
	{
		pid: 1,
		avatar: '',
		timestamp: '12/10/2015',
		source: 'OneYum',
		title: 'Get Involved',
		description: 'Make a meal that\'s tasty and contribute to our menu options. Every time someone orders your meal, we will give you a percentage of those sales back.',
		action: 'Learn more about contributing',
		viewed: false
	}];
	return {
		get: function() {
			return Activity;
		}
	};
})

.factory('Plans', function(){
	var PlanListOpen = [{
		// pid:2,
		// title: '12/16/2015 - 12/23/2015',
		// targets: [{
		// 	name: "Bobby Fisher",
		// 	meals:[{
		// 		mid:1,
		// 		title: "Monday Dinner",
		// 		base: [{
		// 			'meats': 21,
		// 			'veg': 28,
		// 			'grains': 21,
		// 			'fruits': 20,
		// 			'dairy': 10
		// 		}]
		// 	}]
		// }]
	}];
	var PlanListHistory = [{
		// pid:1,
		// title: '12/08/2015 - 12/15/2015',
		// targets: [{
		// 	name: "Bobby Fisher",
		// 	meals:[{
		// 		mid:1,
		// 		title: "Monday Dinner",
		// 		base: [{
		// 			'meats': 21,
		// 			'veg': 28,
		// 			'grains': 21,
		// 			'fruits': 20,
		// 			'dairy': 10
		// 		}]
		// 	}]
		// }]
	}];

	return {
		getPlans: function() {
			return PlanListOpen;
		},
		getHistory: function() {
			return PlanListHistory;
		}
	};
})

.factory('Articles',function(){
	return{
		getAll: function() {

		},
		set: function(data) {

		},
		getbyID: function(data) {

		},
		add: function(data) {

		}
	};
})