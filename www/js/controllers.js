angular.module('OneYum.controllers', [])

.controller('AppCtrl', ['$scope','$ionicModal','$timeout','$state','RegisterService','Popup','PopupFill','LoginService','SupportOptionList','$ionicLoading','Identification', function($scope, $ionicModal, $timeout, $state, RegisterService, Popup, PopupFill, LoginService,SupportOptionList,$ionicLoading,Identification) {
  $scope.screenset1 = false;
  $scope.screenset2 = false;

  $scope.mobile = function() {
    var screen = window.innerWidth;
    if ( screen < 641 ) {
      return true;
    } else {
      return false;
    };
  };

  $scope.tablet = function() {
    var screen = window.innerWidth;
    if ( screen > 640 && screen < 1051 ) {
      return true;
    } else {
      return false;
    };
  };

  $scope.tabletVert = function() {
    var screen = window.innerWidth;
    if ( screen > 640 && screen < 901 ) {
      return true;
    } else {
      return false;
    };
  };

  $scope.tabletHori = function() {
    var screen = window.innerWidth;
    if ( screen > 900 && screen < 1051 ) {
      return true;
    } else {
      return false;
    };
  };

  $scope.desktop = function() {
    var screen = window.innerWidth;
    if ( screen > 1050 ) {
      return true;
    } else {
      return false;
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
      if (resp.id) {
        Identification.setIdent(resp);
        $scope.show();
        $timeout(function() {
          $state.go('account.stream');
          $scope.closeLogin();
          $scope.hide();
          console.log('click');
          
        }, 1000);
      } else {
        $scope.hide();
        Popup.alert(PopupFill.communication.error);
      };
      
    },function(err) {
      if (err) {
        Popup.alert(PopupFill.login.invalidCred);
        $scope.loginData = {};
      };
    });
  };

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
      if (response.id) {
        $scope.show();
        Identification.setIdent(response);
        $timeout(function() {
          $state.go('account.stream');
          $scope.registerData = {};
          $scope.closeRegister();
          $scope.hide();
          console.log('click');
          
        }, 1000);
      } else {
        Popup.alert(PopupFill.login.invalidCred);
        $scope.loginData = {};
      };
        
      
    }, function(err) {
      if (err) {
        Popup.alert(PopupFill.register.problem);
        $scope.loginData = {};
      };
    });
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

.controller('PieCtrl', ['$scope', function($scope){
  $scope.mobile = function() {
    var screen = window.innerWidth;
    if ( screen < 641 ) {
      return true;
    } else {
      return false;
    };
  };

  $scope.tablet = function() {
    var screen = window.innerWidth;
    if ( screen > 640 && screen < 1051 ) {
      return true;
    } else {
      return false;
    };
  };

  $scope.tabletVert = function() {
    var screen = window.innerWidth;
    if ( screen > 640 && screen < 901 ) {
      return true;
    } else {
      return false;
    };
  };

  $scope.tabletHori = function() {
    var screen = window.innerWidth;
    if ( screen > 900 && screen < 1051 ) {
      return true;
    } else {
      return false;
    };
  };

  $scope.desktop = function() {
    var screen = window.innerWidth;
    if ( screen > 1050 ) {
      return true;
    } else {
      return false;
    };
  }

  $scope.traditional = {
    data:[2,1.5,3,4,3],
    labels: ['Fruits','Dairy','Meats','Veggies','Grains'],
  };

  $scope.vegetarian = {
    data:[2,1.5,3,4,3],
    labels: ['Fruits','Dairy','Proteins','Veggies','Grains'],
  };
  $scope.onClick = function() {
    console.log('click');
  }
  $scope.options = {
    //Boolean - Whether we should show a stroke on each segment
    segmentShowStroke : true,

    //String - The colour of each segment stroke
    segmentStrokeColor : "#fff",

    //Number - The width of each segment stroke
    segmentStrokeWidth : 2,

    //Number - The percentage of the chart that we cut out of the middle
    percentageInnerCutout : 0, // This is 0 for Pie charts

    //Number - Amount of animation steps
    animationSteps : 100,

    //String - Animation easing effect
    animationEasing : "easeOutBounce",

    //Boolean - Whether we animate the rotation of the Doughnut
    animateRotate : false,

    //Boolean - Whether we animate scaling the Doughnut from the centre
    animateScale : false,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",

    // Boolean - whether or not the chart should be responsive and resize when the browser does.
    responsive: true,

    // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
    maintainAspectRatio: false,

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

.controller('MessageCtrl', ['$scope','Posts', function($scope,Posts){
  $scope.Posts = Posts.get();

  $scope.changeViewed = function(data) {
    console.log(data);
    $scope.Posts = Posts.updateViewed(data.pid);
    console.log($scope.Posts);
  }

  $scope.$watch('Posts', function() {

  })
}])

.controller('PlanCtrl', ['$scope','$stateParams','Plans','$ionicNavBarDelegate','$state','Identification','HouseholdService','MemberService','Members', function($scope,$stateParams,Plans,$ionicNavBarDelegate,$state,Identification,HouseholdService,MemberService,Members){

  if (!$stateParams.id) {
    HouseholdService.get()
    .then(function(resp) {
      $scope.HHold = Identification.getHHold();
      console.log($scope.HHold);
      MemberService.get()
      .then(function(resp) {
        console.log(resp);
      }, function(err) {
        console.log(err);
      });
    }, function(err) {
      console.log(err);
    });
  };

  $scope.HHold = Identification.getHHold();
  $scope.Ident = Identification.getIdent();
  $scope.Members = Members.getAll();
  $scope.OpenPlans = Plans.getPlans();
  $scope.PastPlans = Plans.getHistory();
  // console.log($scope.Plans);


  $scope.goToHHManage = function() {
    $state.go('account.plans-household',{id:$scope.Ident.id});
  }

  $scope.goToPlans = function() {
    $state.go('account.plans');
  }
  $scope.createPlan = {};
  
  var today = new Date();

  $scope.addDays = function(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };
  $scope.date = $scope.addDays(today,3);

  var disabledDates = [
    // new Date(1437719836326),
    // new Date(),
    // new Date(2015, 7, 10), //months are 0-based, this is August, 10th!
    // new Date('Wednesday, August 12, 2015'), //Works with any valid Date formats like long format
    // new Date("08-14-2015"), //Short format
    // new Date(1439676000000) //UNIX format
  ];
  var datePickerCallback = function (val) {
    if (typeof(val) === 'undefined') {
      // console.log('No date selected');
    } else {
      console.log('Selected date is : ', val)
      
      $scope.date = val;
    }
  };
  var weekDaysList = ["S", "M", "T", "W", "T", "F", "S"];
  var monthList = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  $scope.datepickerObject = {
    // titleLabel: 'Title',  //Optional
    todayLabel: '',  //Optional
    closeLabel: 'Close',  //Optional
    setLabel: 'Select',  //Optional
    setButtonType : 'btn',  //Optional
    // todayButtonType : 'button-assertive',  //Optional
    closeButtonType : 'button-light',  //Optional
    inputDate: $scope.date,  //Optional
    mondayFirst: false,  //Optional
    disabledDates: disabledDates, //Optional
    weekDaysList: weekDaysList, //Optional
    monthList: monthList, //Optional
    templateType: 'popup', //Optional
    showTodayButton: 'false', //Option
    modalHeaderColor: 'bar-positive', //Optional
    modalFooterColor: 'bar-positive', //Optional
    from: $scope.addDays(today,2), //Optional
    to: new Date(2018, 8, 25),  //Optional
    callback: function (val) {  //Mandatory
      datePickerCallback(val)
    },
    dateFormat: 'YYY-MM-DDTHH:MM:SS', //Optional
    closeOnSelect: true, //Optional
  };



}])

.controller('CalendarCtrl', ['$scope', function($scope){
  
}])

.controller('StreamCtrl', ['$scope','Activity','Identification','$state', function($scope,Activity,Identification,$state){
  
  $scope.HMessages = Activity.get();
  console.log($scope.HMessages);
  $scope.countHMessages = function() {
    $scope.HMCount = 0;
    // console.log('Enter');
    for (var i = 0; i < $scope.HMessages.length; i++) {
      if(!$scope.HMessages[i].viewed) {
        $scope.HMCount = $scope.HMCount + 1;
        // console.log('Added');
      }
    };
    return $scope.HMCount;
  }
  $scope.view = function(){
    $scope.countHMessages = function() {
      return 0;
    };
  }
}])

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('AccountCtrl', function($scope, $stateParams) {
})

.controller('HouseholdCtrl', function($scope, $stateParams,$ionicNavBarDelegate,Identification,$state,Locations,HouseholdService,MemberService,Members) {

  // HouseholdService.get()

  $scope.self = Identification.getIdent();
  $scope.hhold = Identification.getHHold();
  $scope.members = Members.getAll();
  $scope.NewHH = {};

  $scope.cancelNewHH = function () {
    $scope.NewHH = {};

  }

  $scope.addNewHH = function(data) {
    console.log(data);
    HouseholdService.add(data)
    .then(function(resp) {
      console.log(resp);
      $scope.hhold = Identification.getHHold();
      console.log(resp.hid);
      MemberService.add({hid:resp.hid})
      .then(function(resp) {
        console.log(resp);
        $scope.members = Members.getAll();
      });
    },function(err) {
      console.log(err);
    })
  }

  $scope.location = Locations.build();
  $scope.Locations = Locations.get();
  if ($scope.self.length && $scope.hhold.length) {
    console.log($scope.self,$scope.hhold);
  };

  $scope.goToHH = function() {
    $state.go('account.plans-household',{id:$scope.self.id});
  }

  $scope.newLocation = function(data) {
    var request = data;
    request.hid = Identification.getHHold()[0].hid;

    console.log(request,Identification.getHHold().length);
    // LocationService.add(request)
    // .then(function(resp) {
    //   $scope.Locations = Locations.get();
    //   console.log($scope.Locations);
    // },function(err) {
    //   console.log(err);
    // })
    
    // $state.go('account.plans-household');
    // console.log(data);
  }

  $scope.goToPlans = function() {
    $scope.location = '';
    $state.go('account.plans');
  }

  $scope.$watch('Identification.getHHold()', function() {
    $scope.hhold = Identification.getHHold();
    console.log($scope.hhold);
  })

  $scope.$watch('Members.getAll()', function() {
    $scope.members = Members.getAll();
    console.log($scope.members);
  })


});
