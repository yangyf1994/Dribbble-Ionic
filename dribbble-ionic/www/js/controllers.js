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

  $scope.LoggedIn = false;

  $scope.login = function (user) {

    User.$authWithPassword({
      email: user.email,
      password: user.password
    }).then(function(authData) {
      $scope.userInfo = authData.password.email;
      $scope.LoggedIn = true;
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  }

})

.controller('RegisterCtrl',function ($scope) {

});

