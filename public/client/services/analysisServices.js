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
      //in the db, looking at
      url: session.url + '/'
    })
    .then(function(resp) {
      // Historical data pulled from DB

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
      url: session.url + '/' + session.id
    })
    .then(function(resp){

      session.data = resp.data;
      cb(resp.data);
    })
  }


  return {
    getSessionsHistory: getSessionsHistory
  };

});
