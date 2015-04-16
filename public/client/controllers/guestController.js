angular.module('greenfield')
  .controller('GuestController', ['$scope', 'GuestServices', function($scope, GuestServices) {

  $scope.data = {};

  // Open Session
  $scope.init = function(sessionId) {
    GuestServices.getSession( sessionId, function(sessionId, data) {
      console.log('listening...');
      GuestServices.listen( function(data) {
        console.log(data);
      });
    });
  };

  // Submit a vote
  $scope.vote = function() {

    GuestServices.vote(Math.floor(Math.random() * 5.9));
    
  };

  // This will be given before this page loads.
  $scope.init('c1');

}]);
