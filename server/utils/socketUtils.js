var io = require('../../server').io;
var sessions = require('../collections/SessionsCollection').sessions;

exports.init = function(sessionId, calculateStats) {
  var sessionGuestIo = io.of(sessionId);
  sessionGuestIo.on('connect', function(socket) {
    socket.emit('valid');
    socket.on('vote', function(voteVal) {
      sessions.changeVote(sessionId, socket.id, voteVal);
    });
    socket.on('disconnect', function() {
      sessions.changeVote(sessionId, socket.id, null);
    });
  });

  // TODO: Add auth for this room
  var sessionHostIo = io.of('host/'+sessionId);
  sessionHostIo.on('connect', function(socket) {
    socket.on('end', function() {
      sessionGuestIo.emit('end');
      socket.broadcast.emit('end');
      sessions.removeSession(sessionId);
    });

    // Calls calculateStats every interval with the proper sessionId
    setInterval(function() {
      calculateStats(sessionId, function(data) {
        sessionHostIo.emit('stats', data);
      });
    }, sessions.get(sessionId).get('interval'));
  });
};
