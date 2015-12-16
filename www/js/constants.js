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

.constant('SupportOptionList', [
	{
		title: 'Business Concept Survey',
		thumbnail: 'ion-clipboard',
		description: 'This survey will help us understand the community needs and how they see our business model being able to fulfill those needs.',
		link: '<iframe src="https://docs.google.com/forms/d/1k4nE3QdKUZLsIKnNiIYoQ6SsMWU_cfL9QpjIKzvkJcQ/viewform?embedded=true" width="760" height="500" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>'
	},
	{
		title: 'Product/Service Survey',
		thumbnail: 'ion-clipboard',
		description: 'This survey will help us understand the how consumers manage meals from planning to procurement, to preparation. We want to satisfy as many needs as we can in a reasonable manner.',
		link: ''
	},
])