angular.module('tokki')
  .controller('GuestController', ['$scope', '$state', '$stateParams', '$location', 'GuestServices', function($scope, $state, $stateParams, $location, GuestServices) {

  // Rating values and gui state
  $scope.ratings = [
  {value: 2, selected: null},
  {value: 1, selected: null},
  {value: 0, selected: null},
  {value:-1, selected: null},
  {value:-2, selected: null}];

  // Current vote value
  $scope.currRating = null;

  // Opens Session
  $scope.init = function(sessionId) {
    GuestServices.getSession( sessionId, function(sessionId, data) {
      // Runs on session end
      GuestServices.listen( function() {
        $state.go('home', {}, {reload: true});
      });
    });
  };

  // Submits a vote, updates gui
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

  // Run init, passing in the session id
  $scope.init($location.path().split('/')[2]);
}]);
