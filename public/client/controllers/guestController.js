angular.module('greenfield')
  .controller('GuestController', ['$scope', '$state', 'GuestServices', function($scope, $state, GuestServices) {

  // Holds rating values
  // Holds whether value is selected (for the gui)
  $scope.ratings = [
  {value: 2, selected: null},
  {value: 1, selected: null},
  {value: 0, selected: null},
  {value:-1, selected: null},
  {value:-2, selected: null}];

  // Current Vote value
  $scope.currRating = null;

  // Opens Session
  $scope.init = function(sessionId) {
    GuestServices.getSession( sessionId, function(sessionId, data) {
      console.log('listening...');
      // Runs on session end
      GuestServices.listen( function() {
        console.log('session has ended');
        $state.go('home', {}, {reload: true});
      });
    });
  };

  // Submits a vote
  // If there's a vote, sets the current vote as 'selected'
  $scope.vote = function(newRating) {
    for(var i=0; i < $scope.ratings.length; i++){
      $scope.ratings[i].selected = null;
    }
    if($scope.currRating === newRating.value){
      GuestServices.vote(null);
      $scope.currRating = null;
    }else{
      GuestServices.vote(newRating.value);
      $scope.currRating = newRating.value;
      newRating.selected = 'selected';
    }
  };

  // This will be given before this page loads.
  $scope.init('c1');

}]);
