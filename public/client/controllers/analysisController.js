angular.module('tokki')
  .controller('AnalysisController', ['$scope', 'AnalysisServices', function($scope, AnalysisServices) {

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
