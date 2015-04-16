angular.module('greenfield')
  .controller('HostController', ['$scope', 'HostServices', function($scope, HostServices) {

  $scope.data = {};

  // Opens a new session
  $scope.startSession = function() {
    console.log("The session has been started");
    HostServices.startSession()
      .then(HostServices.listen.bind(null, function(data){
        console.log(data);
      }));
  };

  // Ends a session
  $scope.endSession = function() {
    console.log("Session ended");
    HostServices.endSession();
  };
}]);
