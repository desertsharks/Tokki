// Socket helper functions
angular.module('tokki')
  .factory('AnalysisServices', function($http) {

  $scope.sessions = {
    sessionId:{
    id: '',
    url: '#/api/',
    hostId: hostId,
    sessionId: sessionId,
    data: data
    }
  };

  // Sends a request of all sessions from a host
  // Receives the session IDs, start times
  // Expected from hostHistoryView
  var sessionHistory = function(cb) {
    return $http({
      method: 'GET',
      //Call to Server, who has DB methods
      url: session.url + '/host/old'
    })
    .then(function(resp) {
      console.log("SessionHistory called");
      // Historical data pulled from server via db
      session.data = resp.data;
      cb(resp.data);
    });
  };

  //Sends a request of a specific session from a host
  //Recieves detailed vote average vs time data
  //Expected from hostAnalysisView
  var sessionAnalysis = function(cb){
    return $http({
      method: 'GET',
      url: session.url + session.hostId + '/' + session.sessionId
    })
    .then(function(resp){
      console.log("SessionAnalysis called");
      session.data = resp.data;
      cb(resp.data);
    });
  };


  return {
    sessionsHistory: sessionsHistory,
    sessionAnalysis: sessionAnalysis
  };

});
