angular.module('OneYum.constants', [])

.constant('API', {
	// login: 			'http://localhost/OneYum/server/index.php/login',
	// username: 		'http://localhost/OneYum/server/index.php/checkusername',
	// email: 			'http://localhost/OneYum/server/index.php/checkemail',
	// register: 		'http://localhost/OneYum/server/index.php/register',
	// validateSupKey: 	'http://localhost/OneYum/server/index.php/validatesupkey',
	// supregister: 	'http://localhost/OneYum/server/index.php/supregister',
	// meals: 			'http://localhost/OneYum/server/index.php/meals',
	// location: 		'http://localhost/OneYum/server/index.php/location',
	// household: 		'http://localhost/OneYum/server/index.php/household',
	// members: 		'http://localhost/OneYum/server/index.php/members',
	// refresh: 		'http://localhost/OneYum/server/index.php/refresh',


	login: 			'http://www.oneyum.org/oneyum.org/server/index.php/login',
	username: 		'http://www.oneyum.org/oneyum.org/server/index.php/checkusername',
	email: 			'http://www.oneyum.org/oneyum.org/server/index.php/checkemail',
	register: 		'http://www.oneyum.org/oneyum.org/server/index.php/register',
	validateSupKey: 'http://www.oneyum.org/oneyum.org/server/index.php/validatesupkey',
	supregister: 	'http://www.oneyum.org/oneyum.org/server/index.php/supregister',
	meals: 			'http://www.oneyum.org/oneyum.org/server/index.php/meals',
	location: 		'http://www.oneyum.org/oneyum.org/server/index.php/location',
	household: 		'http://www.oneyum.org/oneyum.org/server/index.php/household',
	members: 		'http://www.oneyum.org/oneyum.org/server/index.php/members',
	refresh: 		'http://www.oneyum.org/oneyum.org/server/index.php/refresh'
})

.constant('PopupFill', {
	register: {
		passwordmismatch: {
			title: 'Uh oh...',
			message: 'Passwords do not match. Please try again.'
		},
			problem: {
				title: 'Uh oh...',
				message: 'There seems to have been an issue during registration.'
		}
	},
	login: {
		invalidCred: {
			title: 'Uh oh...',
			message: 'The crednetials you have entered don\'t match our records. Please correct and try again.'
		}
	},
	communication: {
		error: {
			title: 'Uh oh...',
			message: 'We are exeriencing minor serve delays. Please try again later.'
		}
	}
})

.constant('SupportOptionList', [
	{
		title: 'Business Concept Survey',
		thumbnail: 'ion-clipboard',
		description: 'This survey will help us understand the community needs and how they see our business model being able to fulfill those needs.',
		link: ''
	},
	{
		title: 'Product/Service Survey',
		thumbnail: 'ion-clipboard',
		description: 'This survey will help us understand the how consumers manage meals from planning to procurement, to preparation. We want to satisfy as many needs as we can in a reasonable manner.',
		link: ''
	},
])

.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})

.constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  user: 'user',
  busioness: 'business'
})