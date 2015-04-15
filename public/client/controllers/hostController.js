angular.module('greenfield')
  .controller('HostController', ['$scope', 'HostServices', function($scope, HostServices) {

  $scope.data = {};

  // Opens a new session
  $scope.startSession = function() {
    HostServices.startSession()
      .then(HostServices.listen.bind(null, function(data){
        console.log(data);
      }));
  };

  // Ends a session
  $scope.endSession = function() {
    HostServices.endSession();
  };

}]);
