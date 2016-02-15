// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'OneYum' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'OneYum.controllers' is found in controllers.js
angular.module('OneYum', ['ionic','ionic-datepicker', 'ngCookies','ui.router','ngHello','ngFileUpload','angular-jwt','ngTouch','chart.js','jett.ionic.filter.bar', 'srph.timestamp-filter', 'OneYum.controllers', 'OneYum.services', 'OneYum.factories', 'OneYum.constants','locator'])
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
        controller: 'AppCtrl'
      }
    }
  })

  .state('welcome.meals', {
    url: '/meals',
    views: {
      'menuContent': {
        templateUrl: 'templates/meals.html',
        controller: 'PieCtrl'
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
    url: '/support/detail/:template',
    views: {
      'menuContent': {
        templateUrl: 'templates/support-detail.html'
      }
    }
  })

  .state('welcome.media', {
    url: '/media',
    views: {
      'menuContent': {
        templateUrl: 'templates/media.html'
      }
    }
  })

  .state('account', {
    url: '/account',
    abstract: true,
    templateUrl: 'templates/account.html',
    controller: 'AccountCtrl'
  })

  .state('account.stream', {
    url: '/stream',
    views: {
      'account-stream': {
        templateUrl: 'templates/account-stream.html',
        controller: 'StreamCtrl'
      }
    }
  })

  .state('account.plans', {
    url: '/plans',
    views: {
      'account-plans': {
        templateUrl: 'templates/account-plans.html',
        controller: 'PlanCtrl'
      }
    }
  })

  .state('account.plans-household', {
    url: '/plans/household/:id',
    views: {
      'account-plans': {
        templateUrl: 'templates/account-household.html',
        controller: 'HouseholdCtrl'
      }
    }
  })

  .state('account.plans-household-location', {
    url: '/addlocation',
    views: {
      'account-plans': {
        templateUrl: 'templates/new-location.html',
        controller: 'HouseholdCtrl'
      }
    }
  })

  .state('account.plans-household-member', {
    url: '/addmember',
    views: {
      'account-plans': {
        templateUrl: 'templates/new-member.html',
        controller: 'HouseholdCtrl'
      }
    }
  })

  .state('account.plans-create', {
    url: '/plans/create',
    views: {
      'account-plans': {
        templateUrl: 'templates/account-plans-create.html',
        controller: 'PlanCtrl'
      }
    }
  })

  .state('account.messages', {
    url: '/messages',
    views: {
      'account-messages': {
        templateUrl: 'templates/account-messages.html',
        controller: 'MessageCtrl'
      }
    }
  })

  .state('account.calendar', {
    url: '/calendar',
    views: {
      'account-calendar': {
        templateUrl: 'templates/account-calendar.html',
        controller: 'CalendarCtrl'
      }
    }
  })

  .state('account.details', {
    url: '/details',
    views: {
      'account-details': {
        templateUrl: 'templates/account-details.html',
        controller: 'AccountDetailCtrl'
      }
    }
  })

  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/welcome/home');
})


.run(function($log,$rootScope,$ionicPlatform,$state,$cookies,RefreshService,Identification,location,reverseGeocoder,globalConfig,AuthService) {
  console.groupCollapsed('APP RUN');

  // Initialize user location variable for use later
  $rootScope.userLocation = '';
  
  location.get( function() {
    console.groupCollapsed('Location Services');
    console.log('Location detection allowed');
    console.log(location);
    $rootScope.userLocation = location.current;
    console.log('userLocation: ');
    console.log($rootScope.userLocation);
    location.ready( function() {
      reverseGeocoder.geocode( $rootScope.userLocation ).then( function( results ) {
        console.groupCollapsed("reverseGeocoder Engaged");
        console.log('reverseGeocoder succeeded:');
        console.log(results);
        // $scope.locationOptions = results;
        console.groupEnd();
      }, $log.error);
    });
    console.groupEnd();
  }, function() {
    console.log('Location detection denied');
  });


  hello.init(
  {
    facebook: '965129180247542'//Test App ID
    // facebook: '964419160318544' // Full App ID
  }
  );

  // Set global API variables based on page URL and 
  var url = window.location.href;
  console.log("URL: " + url);
  if( url.indexOf( 'localhost' ) ) {
    console.log(url.indexOf( 'localhost' ));
    console.log({
      DevAPI: globalConfig.localDevApiRoute,
      LocalDevUplaod: globalConfig.localDevUploadRoute
    });
    $rootScope.apiRoute = globalConfig.localDevApiRoute;
    $rootScope.uploadRoute = globalConfig.localDevUploadRoute;
  }

  console.log($rootScope.userLocation);

  $rootScope.$on('$stateChangeStart', function ( event, toState ) {
    console.groupCollapsed( 'Checking User Authentication' );
    console.log({'toState': toState});
    var isAuth = AuthService.isAuthorized();
    
    if ( !isAuth ) {
      console.log('No User Set');
      if( globalConfig.authorizedRoutes.withoutUserAccount.indexOf( toState.name ) < 0 ) {
        console.log('You\'re not supposed to be here.');
        event.preventDefault();
        $state.go('welcome.home');
      }
    } else {
        if( toState.name === 'welcome.home' ) {
          console.log('Auth Exists');
          Identification.setIdent(AuthService.isAuthorized().Ident);
          console.log(isAuth);
          console.log('Welcome ' + Identification.getIdent().fname);
          event.preventDefault();
          $state.go('account.stream');
        } else {
          Identification.setIdent(AuthService.isAuthorized().Ident);
        }
    }
    console.groupEnd();
  });
  
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
      
  console.groupEnd();   
});
