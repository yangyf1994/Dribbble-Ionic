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

.controller('AccountCtrl', function($scope,User) {

  $scope.login = function (user) {

    User.$authWithPassword({
      email: user.email,
      password: user.password
    }).then(function(authData) {
      $scope.userInfo = authData.password.email;
      $scope.error_message=null;
      user.email='';
      user.password='';
    }).catch(function(error) {
      $scope.error_message = error.code;
    });
  }

  $scope.logout = function () {
    User.$unauth();
    $scope.userInfo=null;
  }
})

.controller('RegisterCtrl',function ($scope,User,$ionicHistory,$ionicPopup,$timeout,YO_API_TOKEN) {

  $scope.register = function (user) {

    User.$createUser({
      email: user.email,
      password: user.password
      }).then(function(userData) {

        console.log("User " + user.name+ " created successfully!");

        var alertPopup = $ionicPopup.alert({
          title: 'Register Success!',
          template: 'Thank you '+user.name+' !'+'<br>You are now directed to the login page.'
        });

        alertPopup.then(function(res) {
          $ionicHistory.goBack();
        });

        $timeout(function() {
            alertPopup.close();
        }, 5000);

    }).catch(function(error) {
        console.error("Error: ", error.code);
      });
   }


});

