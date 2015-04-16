angular.module('greenfield')
  .controller('HostController', ['$scope', 'HostServices', function($scope, HostServices) {

  $scope.sessionId = 'no current session';
  $scope.currAvg = 'current average';
  $scope.ovrAvg = 'overall average';
  $scope.time = 'time';
  // Opens a new session
  $scope.startSession = function() {
    HostServices.startSession( function(data) {
      $scope.sessionId = data;
      HostServices.listen( function(data) {
        console.log(data);
      });
    });
  };

  // Ends a session
  $scope.endSession = function() {
    HostServices.endSession();
  };

  $scope.startSession();

}]);
