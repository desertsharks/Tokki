angular.module('tokki')
  .controller('HostController', ['$scope', 'HostServices', function($scope, HostServices) {

  // Initial gui state
  $scope.sessionId = 'no current session';
  $scope.currAvg = 0;
  $scope.hisAvg = 0;
  $scope.userCount = 0;
  $scope.time = moment().format('h:mm');

  // Updates the time every second.
  setInterval(function(){
    $scope.time = moment().format('h:mm:ss');
    $scope.$apply();
  }, 1000);

  // Opens a new session
  $scope.init = function() {

    // Start a new session, and start listening on a response
    HostServices.startSession( function(newSessionId) {
      $scope.sessionId = newSessionId;

      // Adjusts the gui based on data summary
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
    HostServices.endSession();
  };

  $scope.init();
}]);
