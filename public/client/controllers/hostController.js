angular.module('tokki')
  .controller('HostController', ['$scope', 'HostServices', function($scope, HostServices) {

  $scope.sessionId = 'no current session';
  $scope.currAvg = 0;
  $scope.hisAvg = 0;
  $scope.userCount = 0;
  $scope.time = moment().format('h:mm');
  setInterval(function(){
    $scope.time = moment().format('h:mm');
    $scope.$apply();
  }, 1000);

  // Opens a new session
  $scope.startSession = function() {

    HostServices.startSession( function(newSessionId) {
      console.log('now listening for votes on session: ' + newSessionId);
      $scope.sessionId = newSessionId;

      HostServices.listen( function(sessionData) {
        $scope.userCount = sessionData.userCount || 0;
        $scope.currAvg = (sessionData.currentAverage || 0).toFixed(2);
        $scope.hisAvg = (sessionData.historicalAverage || 0).toFixed(2);
        $scope.$apply();
      });

    });
  };

  // Ends a session
  $scope.endSession = function() {
    console.log("Session ended");
    HostServices.endSession();
  };


  $scope.startSession();

}]);
