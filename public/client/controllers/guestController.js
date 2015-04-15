angular.module('greenfield')
  .controller('GuestController', ['$scope', 'GuestServices', function($scope, GuestServices) {

  $scope.data = {};

  // Open Session
  $scope.init = function() {
    GuestServices.startSession()
      .then(listen.bind(this, function(data){
        console.log(data);
      }));
  };

  // Submit a vote
  $scope.vote = function() {
    GuestServices(vote);
  };

}]);
