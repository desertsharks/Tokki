var sessions = require('../SessionsCollection').sessions;

// Calls calculateStats and notifies host on a setInterval
exports.notifyHost = function() {};

// Calculates the aggregate stats from cache
// Returns current and average
exports.calculateStats = function(session) {};

// Return a sessionId
// Begins listening to a session
exports.registerSession = function(hostId) {};
