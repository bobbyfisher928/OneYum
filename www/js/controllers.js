angular.module('OneYum.controllers', [])

.controller('AppCtrl', ['$scope','$ionicModal','$timeout','$state','RegisterService','Popup','PopupFill','LoginService','SupportOptionList','$ionicLoading', function($scope, $ionicModal, $timeout, $state, RegisterService, Popup, PopupFill, LoginService,SupportOptionList,$ionicLoading) {
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
  //
  $scope.isTakenUsername = false;
  $scope.isTakenEmail = false;

  // Form data for the login modal
  $scope.loginData = {};

  // Form data for the register modal
  $scope.registerData = {};

  // Form data for the supplier key validation
  $scope.supReg = {};

  // Form data for the supplier register modal
  $scope.supplierregister = {
    name: 'This Company',
    email: 'this@email.test'
  };

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

  $ionicModal.fromTemplateUrl('templates/supRegister.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.supRegistermodal = modal;
  });

  $scope.show = function() {
    $ionicLoading.show({
      templateUrl: '../templates/ripple.html'
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.loginmodal.hide();
  };

  $scope.closeRegister = function() {
    $scope.registermodal.hide();
  };

  $scope.closeSupRegister = function() {
    $scope.supRegistermodal.hide();
  }

  $scope.goToSupplierPage = function() {
    $scope.closeSupRegister();
    $state.go('welcome.suppliers');
  }


  // Open the login modal
  $scope.login = function() {
    $scope.loginmodal.show();
  };

  $scope.register = function() {
    $scope.closeLogin();
    $scope.registermodal.show();
  };

  $scope.supRegister = function() {
    $scope.closeRegister();
    $scope.supRegistermodal.show();
  }

  // Perform the login action when the user submits the login form
  $scope.doLogin = function(data) {
    // console.log('Doing login', $scope.loginData);
    // 
    LoginService.login(data)
    .then(function(resp) {
      console.log(resp);
      
      $scope.show();
      $timeout(function() {
        $state.go('account.stream');
        $scope.closeLogin();
        $scope.hide();
        console.log('click');
        
      }, 1000);
    },function(err) {
      if (err) {
        Popup.alert(PopupFill.login.invalidCred);
        $scope.loginData = {};
      };
    });

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    // $timeout(function() {
    //   $scope.closeLogin();
    // }, 1000);
  };

  $scope.checkUsername = function(data) {
    RegisterService.check(data);
    // console.log(data);
  }

  $scope.doRegister = function(data) {
    // console.log('Doing register', $scope.registerData);
    if(data.password !== data.verpassword) {
      Popup.alert({
        title: PopupFill.register.passwordmismatch.title,
        title: PopupFill.register.passwordmismatch.message
      })
      return;
    }
    RegisterService.register(data)
    .then(function(response) {
      console.log(response);
      // $scope.registerData = {};
      // $scope.closeRegister();
    })
    // // Simulate a register delay. Remove this and replace with your register
    // // code if using a register system
    // $timeout(function() {
      
    // }, 1000);
  };

  $scope.dosupRegisterkey = function(data) {
    console.log(data);
  }

  $scope.dosupRegister = function(data) {
    console.log(data);
  }

  $scope.supportOptions = SupportOptionList;

  // console.log($scope.supportOptions);

  $scope.goToSupportTemplate = function(data) {
    $scope.TemplateTitle = data;
    $state.go('welcome.support-detail');
    // console.log(data);
  }
}])

.controller('ContactCtrl', ['$scope', function($scope){
  $scope.openEmail = false;
  $scope.openPhone = false;
  $scope.openMail = false;
  $scope.engageEmail = function() {
    $scope.openEmail = !$scope.openEmail;
  }
  $scope.engagePhone = function() {
    $scope.openPhone = !$scope.openPhone;
  }
  $scope.engageMail = function() {
    $scope.openMail = !$scope.openMail;
  }

}])

.controller('ContactFormCtrl', ['$scope','$stateParams','ContactService', function($scope,$stateParams,ContactService){
  console.log(ContactService.get($stateParams.target));
  $scope.Target = ContactService.get($stateParams.target);
  $scope.submit = function(data) {
    console.log(data);
  }
}])

.controller('ContactCallCtrl', ['$scope','$stateParams','ContactService', function($scope,$stateParams,ContactService){
  console.log(ContactService.get($stateParams.target));
  $scope.Target = ContactService.get($stateParams.target);
  $scope.submit = function(data) {
    console.log(data);
  }
}])


.controller('HomeCtrl', function($scope) {
  
})

.controller('AccountCtrl', ['$scope', function($scope){
  
}])

.controller('MessageCtrl', ['$scope', function($scope){
  
}])

.controller('MealCtrl', ['$scope', function($scope){
  
}])

.controller('CalendarCtrl', ['$scope', function($scope){
  
}])

.controller('StreamCtrl', ['$scope','Posts', function($scope,Posts){
  $scope.Posts = Posts.get();
}])

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
