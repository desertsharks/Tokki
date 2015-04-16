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
    // The log here does two things
    // 1. Makes sure the method is being called.
    // 2. Checks to see what a vote is. This is currently undefined
    console.log("Vote info: ", vote);
    GuestServices(vote);
  };

}]);
