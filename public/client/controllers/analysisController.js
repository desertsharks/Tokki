angular.module('tokki')
  .controller('AnalysisController', ['$scope', 'AnalysisServices', function($scope, AnalysisServices) {
  //Sample data for now
  $scope.sessions = {
    c1:{
      id: c1,
      startTime: 0900,
      elapsedTime: 89000,
      cumSumVoteVals: 20,
      sumVoteCounts: 10,

    }


  };
  $scope.selectedSessionId = null;
  $scope.currHostId = null;

  $scope.init = function(currHostId) {
    AnalysisServices.sessionHistory( currHostId, function(sessionId, data) {
      console.log('Populated data from host: ' + currHostId);
    });
  };

  // Pulls data from DB for analysis
  $scope.sessionHistory = function(){
    console.log("Accessing session data");
    AnalysisServices.sessionHistory();
  };

  // Presents analysis for a specific session
  $scope.sessionAnalysis = function(){
    console.log("Session Analysis");
    AnalysisServices.sessionAnalysis();
  }


}]);
