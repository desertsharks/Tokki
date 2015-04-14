var io = require('../../server').io;

exports.init = function(sessionId, calculateStats) {
  // Wrapped in an iife to preserve sessionId references
  (function(sessionId) {
    // TODO: Write start to db

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
    var hostIds = [];
    var sessionHostIo = io.of('host/'+sessionId);
    sessionHostIo.on('connect', function(socket) {
      hostIds.push(socket.id);
      socket.on('end', function() {
        sessionGuestIo.emit('end');
        // TODO: Write close to db
      });
      socket.on('disconnect', function() {
        var index = hostIds.indexOf(socket.id);
        if (index > -1) {
          hostIds.splice(index, 1);
        }
      });

      // Calls calculateStats every interval with the proper sessionId
      setInterval(function() {
        calculateStats(sessionId, function(data) {
          sessionHostIo.emit('stats', data);
        });
      }, 2000);
    });
  }(sessionId));
};
