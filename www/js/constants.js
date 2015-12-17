angular.module('OneYum.constants', [])

.constant('API', {
	login: 'http://www.oneyum.org/server/index.php/login',
	username: 'http://www.oneyum.org/server/index.php/checkusername',
	email: 'http://www.oneyum.org/server/index.php/checkemail',
	register: 'http://www.oneyum.org/server/index.php/register',
	validateSupKey: 'http://www.oneyum.org/server/index.php/validatesupkey',
	supregister: 'http://www.oneyum.org/server/index.php/supregister',
})

.constant('PopupFill', {
	register: {
		passwordmismatch: {
			title: 'Uh oh...',
			message: 'Passwords do not match. Please try again.'
		},
	},
	login: {
		invalidCred: {
			title: 'Uh oh...',
			message: 'The crednetials you have entered don\'t match our records. Please correct and try again.'
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