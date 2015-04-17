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
    console.log("Session ended");
    HostServices.endSession();
  };

  // Need to pull data from DB for analysis
  $scope.sessionHistory = function(){
    console.log("Accessing session data");
    AnalysisServies.sessionHistory();
  };

  // Presents analysis for a specific session
  $scope.sessionAnalysis = function(){
    console.log("Session Analysis");
    AnalysisServies.sessionAnalysis();
  }



  $scope.startSession();

}]);
