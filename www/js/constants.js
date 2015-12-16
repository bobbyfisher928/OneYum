angular.module('OneYum.constants', [])

.constant('API', {
	login: 'http://localhost/OneYum/server/index.php/login',
	username: 'http://localhost/OneYum/server/index.php/checkusername',
	email: 'http://localhost/OneYum/server/index.php/checkemail',
	register: 'http://localhost/OneYum/server/index.php/register',
	validateSupKey: 'http://localhost/OneYum/server/index.php/validatesupkey',
	supregister: 'http://localhost/OneYum/server/index.php/supregister',
})

.constant('PopupFill', {
	register: {
		passwordmismatch: {
			title: 'Uh oh...',
			message: 'Passwords do not match. Please try again.'
		},
	}
})