angular.module('greenfield')
  .controller('AnalysisController', ['$scope', 'AnalysisServices', function($scope, AnalysisServices) {

  // Need to pull data from DB for analysis
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
