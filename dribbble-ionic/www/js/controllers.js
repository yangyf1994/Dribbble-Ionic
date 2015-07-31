angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,dribble) {

  $scope.current_page = 1;
  $scope.shots = [];

  $scope.loadItems = function () {

      dribble.query({page:$scope.current_page,per_page:10},function (value) {
        console.log('loading page '+$scope.current_page);
        $scope.current_page++;
        $scope.shots=$scope.shots.concat(value.shots);
        console.log($scope.shots);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      },
      function (err) {
        console.log(err);
      });

  };


})

.controller('ChatsCtrl', function($scope, Chats) {

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope,User,PopUp) {

  $scope.login = function (form,user) {

    if(!form.$valid){
      var popUpContent = {
        title: "Warning",
        template: "Please enter a valid email and password",
        timeout: 5000,
      }
      PopUp.showPopUp(popUpContent,null);
    }
    else{
      User.$authWithPassword({
        email: user.email,
        password: user.password
      }).then(function(authData) {
        $scope.userInfo = authData.password.email;
        user.email='';
        user.password='';
      }).catch(function(error) {
        console.log(error);
        var popUpContent = {
          title: "Error",
          template:
          "<i class='icon-left ion-alert-circled'></i>"+
          angular.lowercase(error.code)
        }
        PopUp.showPopUp(popUpContent,function () {
          user.email='';
          user.password='';
        });
      });
    }


  }

  $scope.logout = function () {
    User.$unauth();
    $scope.userInfo=null;
  }
})

.controller('RegisterCtrl',function ($scope,User,$ionicHistory,PopUp,YO_API_TOKEN) {

  $scope.register = function (user) {

    User.$createUser({
      email: user.email,
      password: user.password
      }).then(function(userData) {
        console.log("User " + user.name+ " created successfully!");

        var popUpContent = {
          title: 'Register Success!',
          template: 'Thank you '+user.name+' !'+'<br>You are now directed to the login page.',
          timeout:5000
        };

        PopUp.showPopUp(popUpContent,function() {
          $ionicHistory.goBack();
        });

    }).catch(function(error) {
      var popUpContent = {
        title: 'Error',
        template: angular.lowercase(error.code)
      };

      PopUp.showPopUp(popUpContent,function () {
        user.email='';
        user.password='';
        user.name ='';
      })
    });
   }


});

