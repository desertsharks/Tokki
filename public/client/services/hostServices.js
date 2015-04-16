// Socket helper functions
angular.module('greenfield')
  .factory('HostServices', function($http) {

  var session = {
    id: '',
    url: '/host',
    socket: null
  };

  // Sends a request for a new session.
  // Receives the sessionID of that session.
  var startSession = function() {
    console.log("SESSION URL ", session.url);
    return $http({
      method: 'POST',
      url: session.url
    })
    .then(function(resp) {
      session.id = resp.data;
    });
  };

  // Initiates socket connection
  // Listens for socket events
  var listen = function(cb) {
    console.log(window.location.host);
    session.socket = io.connect(window.location.host + '/' + session.id);
    session.socket.on('connect', function() {
      // Listens for stats
      session.socket.on('stats', function(data) {
        cb(data);
      });
    });
  };

  // emit end to end a session
  var endSession = function() {
    if(session.socket){
      session.socket.emit('end');
    }
  };

  return {
    startSession: startSession,
    listen: listen,
    endSession: endSession
  };

});
