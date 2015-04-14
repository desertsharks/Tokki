// Socket helper functions
app.factory('HostServices', function($http) {

  var session = {
    id: "",
    url: "localhost:4000/host/",
    socket: null
  };

  // Sends a request for a new session.
  // Receives the sessionID of that session.
  var startSession = function() {
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
  var listen = function() {
    var socket = io.connect(session.url + session.id);
    socket.on('connect', function() {
      // Listens for stats
      socket.on('stats', function(data) {
        // TODO: Display Stats
      });
    });
  };

  // emit end to end a session
  var endSession = function() {
    if(session.socket){
      socket.emit('end');
    }
  };

  return {
    startSession: startSession,
    listen: listen,
    endSession: endSession
  };

});


