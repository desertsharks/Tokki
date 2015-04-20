angular.module('tokki')
  .controller('AnalysisController', ['$scope', 'AnalysisServices', function($scope, AnalysisServices) {
  //Sample data for now
  $scope.sessions = {
    c1:{
      1234: {
        guestId: person1,
        timeStep: 43,
        voteVal: 0
      },
      12345: {
        guestId: person2,
        timeStep: 41,
        voteVal: 1
      },
      12222: {
        guestId: person3,
        timeStep: 48,
        voteVal: 2
      },
      startTime: 1429476075172,
      endTime: 1429476075172

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
    console.log("Accessing history...");
    $scope.sessionHistory();
  };

  // Presents analysis for a specific session
  $scope.sessionAnalysis = function(){
    console.log("Session Analysis");
    AnalysisServices.sessionAnalysis();
  };


}]);
