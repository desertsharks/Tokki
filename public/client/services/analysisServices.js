// Socket helper functions
angular.module('greenfield')
  .factory('AnalysisServices', function($http) {

  var session = {
    id: '',
    url: '/host',
    //provider: '', //where can we get this from GET
    socket: null
    data: data
  };

  // Sends a request of all sessions from a host
  // Receives the session IDs, start times
  // Expected from hostHistoryView
  var sessionHistory = function(cb) {
    return $http({
      method: 'GET',
      //Call to Server, who has DB methods
      url: session.url + '/' + sesssion.hostID
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
      url: '#/hostAnalysisView'
    })
    .then(function(resp){
      console.log("SessionAnalysis called");
      session.data = resp.data;
      cb(resp.data);
    })
  }


  return {
    sessionsHistory: sessionsHistory,
    sessionAnalysis: sessionAnalysis
  };

});
