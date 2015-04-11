var sessions = require('../SessionsCollection').sessions;

// Initiates socket.io
// Returns guestId
exports.registerGuest = function(req, res){
  // Takes in sessionId
  // Returns guestId
};

// Takes in guest data
// Adds a timestamp via Moment
// If voteVal, updates hot copy and calls addToDB
exports.update = function(guestId, sessionId, voteVal) {};
