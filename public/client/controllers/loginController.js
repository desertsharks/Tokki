angular.module('greenfield')
  .controller('LoginController', ['$scope', '$state', function($scope, $state) {
// TODO: Add loginServices back in

  $scope.sessionId = "";

  $scope.init = function() {

  };

  $scope.login = function() {

  };

  $scope.logout = function() {

  };

  $scope.newGuest = function() {
    // TODO: Pass in session code from the home view
    $state.go('guestSession', {}, {reload: true});
  };

}]);
