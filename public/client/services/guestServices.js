// Socket helper functions
angular.module('tokki')
  .factory('GuestServices', function($http) {

  var session = {
    id: '',
    url: '/guest',
    socket: null
  };

  // Gets the sessionId from the server, and begins listening
  var getSession = function(sessionId, cb) {
    session.id = sessionId;
    return $http({
      method: 'GET',
      url: session.url + '/' + sessionId
    })
    .then(function(resp) {
      cb(sessionId, resp.data);
    });
  };

  // Initiates socket connection and listens for events
  var listen = function(cb) {

    session.socket = io.connect(window.location.host + '/' + session.id);

    session.socket.on('connect', function() {
      session.socket.on('end', function(data) {
        cb();
      });
    });

    session.socket.on('error', function(err) {
      console.error(err);
    });
  };

  // Sends a vote
  var vote = function(voteData) {
    if(session.socket){
      session.socket.emit('vote', voteData);
    }
  };

  return {
    getSession: getSession,
    listen: listen,
    vote: vote
  };

});
