var sessions = require('../collections/SessionsCollection').sessions;
var socketUtils = require('../utils/socketUtils');

// Calculates the aggregate stats from cache
exports.calculateStats = function(sessionId, cb) {
  cb({
    currentAverage: sessions.getCurrentAverage(sessionId),
    historicalAverage: sessions.getHistoricalAverage(sessionId),
    userCount: sessions.getUserCount(sessionId)
  });
};

// Begins listening to a session and sends the sessionId to the client
exports.registerSession = function(req, res) {
  var sessionId = sessions.addNewSession();
  socketUtils.init(sessionId, function() {
    res.send(sessionId);
  });
};

exports.login = function(req, res) {};

// Redirects any "host/sessionId" path to the angular host page
exports.redirect = function(req, res) {
  res.redirect('/#/host/' + (req.params.sessionId || ''));
};

