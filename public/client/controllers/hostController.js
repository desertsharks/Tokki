app.controller('hostController', ['$scope', 'hostServices', function($scope, hostServices) {

  $scope.data = {};

  // Opens a new session
  $scope.startSession = function() {
    hostServices.startSession()
      .then(function(){
        listen();
      });
  };

  // Ends a session
  $scope.endSession = function() {

  };

}]);