angular.module('tokki')
  .controller('AnalysisController', ['$scope', 'AnalysisServices', function($scope, AnalysisServices) {
  //Sample data for testing hostHistoryView
  $scope.sessions = {
    session1:{
     sessionId: c22,
     startTime: 1429426355540,
     duration: 28420345,
     weightedAverage: 1.212,
     userCount: 2306
    },
    session2:{
     sessionId: c33,
     startTime: 1429426355545,
     duration: 2842034,
     weightedAverage: 0.66,
     userCount: 488
    }
  };

  $scope.rows = [];


  // May use later when recieved from auth
  // to automatically select the host's sessions
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
  };


}]);
