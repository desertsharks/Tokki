// Socket helper functions
app.factory('GuestServices', function($http) {

  var session = {
    id: '',
    // TODO: Establish url
    url: 'localhost:4000/guest/', // NB: I believe a relative path is sufficient for both http and socket.io
    socket: null
  };

  // Route to the guest view and listen on the new sessionId
  var getSession = function(sessionId) {
    session.id = sessionId;
    return $http({
      method: 'GET',
      url: '/guest/' + sessionId
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  // Initiates socket connection
  // Listens for socket events
  var listen = function() {
    session.socket = io.connect(url + session.id);
    session.socket.on('connect', function() {

      // Listens for invalid room
      session.socket.on('invalid', function(data) {
        // TODO: Display a ui warning
      });

      // Listens for end of session
      session.socket.on('end', function(data) {
        // TODO: Activate end of session view
      });
    });
  };

  // Sends vote
  var vote = function(voteData) {
    if(session.socket){
      session.socket.emit(voteData);
    }
  };

  return {
    getSession: getSession,
    listen: listen,
    vote: vote
  };

});
