// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'OneYum' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'OneYum.controllers' is found in controllers.js
angular.module('OneYum', ['ionic', 'ngCookies','ui.router','ngHello','ngFileUpload','angular-jwt','ngTouch','chart.js','jett.ionic.filter.bar', 'srph.timestamp-filter', 'OneYum.controllers', 'OneYum.services', 'OneYum.factories', 'OneYum.constants'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  
  $httpProvider.defaults.withCredentials = true;

  $stateProvider

  .state('welcome', {
    url: '/welcome',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('welcome.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('welcome.meals', {
    url: '/meals',
    views: {
      'menuContent': {
        templateUrl: 'templates/meals.html'
      }
    }
  })

  .state('welcome.suppliers', {
    url: '/suppliers',
    views: {
      'menuContent': {
        templateUrl: 'templates/suppliers.html'
      }
    }
  })

  .state('welcome.partners', {
    url: '/partners',
    views: {
      'menuContent': {
        templateUrl: 'templates/partners.html'
      }
    }
  })

  .state('welcome.careers', {
    url: '/careers',
    views: {
      'menuContent': {
        templateUrl: 'templates/careers.html'
      }
    }
  })

  .state('welcome.about', {
    url: '/about',
    views: {
      'menuContent': {
        templateUrl: 'templates/about.html'
      }
    }
  })

  .state('welcome.contact', {
    url: '/contact',
    views: {
      'menuContent': {
        templateUrl: 'templates/contact.html'
      }
    }
  })

  .state('welcome.contactform', {
    url: '/contactform/:target',
    views: {
      'menuContent': {
        templateUrl: 'templates/contactform.html'
      }
    }
  })

  .state('welcome.contactcall', {
    url: '/contactcall/:target',
    views: {
      'menuContent': {
        templateUrl: 'templates/contactcall.html'
      }
    }
  })

  .state('welcome.support', {
    url: '/support',
    views: {
      'menuContent': {
        templateUrl: 'templates/support.html'
      }
    }
  })

  .state('welcome.support-detail', {
    url: '/detail/:template',
    views: {
      'menuContent': {
        templateUrl: 'templates/support-detail.html'
      }
    }
  })

  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/welcome/home');
});
