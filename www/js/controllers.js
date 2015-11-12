angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {
  $scope.screenset1 = false;
  $scope.screenset2 = false;
  // console.log(window.innerWidth < 650);
  // console.log(screen);
  $scope.setClass = function() {
    if (!$scope.screenset1) {
      var screen = window.innerWidth;
      // console.log(screen);
      if (screen < 650 ) {
        return true;
        // console.log('mobile');
      } else {
        return false;
        console.log('larger');
      };
      $scope.screenset1 = true;
    };
  }; 

  $scope.tablet = function() {
    if (!$scope.screenset2) {
      var screen = window.innerWidth;
      // console.log(screen);
      if (screen < 900 && screen > 649) {
        return true;
        // console.log('mobile');
      } else {
        return false;
        console.log('larger');
      };
      $scope.screenset2 = true;
    };     
  }

  $scope.goHome = function() {
    // $state.go('welcome.home',{},{relative:'^'});
    // window.location('')
  }
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Form data for the login modal
  $scope.registerData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.loginmodal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/register.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.registermodal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.loginmodal.hide();
  };

  $scope.closeRegister = function() {
    $scope.registermodal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.loginmodal.show();
  };

  $scope.register = function() {
    $scope.closeLogin();
    $scope.registermodal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.checkUsername = function(data) {
    console.log(data);
  }

  $scope.doRegister = function() {
    console.log('Doing register', $scope.loginData);

    // Simulate a register delay. Remove this and replace with your register
    // code if using a register system
    $timeout(function() {
      $scope.closeRegister();
    }, 1000);
  };
})




.controller('HomeCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
