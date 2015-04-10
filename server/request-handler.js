// All of the server functions, to refactor later

// ---------------------------Guest Methods---------------------------------- //

// Initiates socket.io
// Returns guestId
exports.registerGuest = function(sessionId){};

// Listens for guest websocket events
// Calls update
exports.listener = function() {};

// Takes in guest data
// Adds a timestamp via Moment
// If voteVal, updates hot copy and calls addToDB
exports.update = function(guestId, sessionId, voteVal) {};

// --------------------------Host Methods------------------------------------ //

// Calls calculateStats and notifies host on a setInterval
exports.notifyHost = function() {};

// Calculates the aggregate stats from cache
// Returns current and average
exports.calculateStats = function(session) {};

// Return a sessionId
// Begins listening to a session
exports.registerSession = function(hostId) {};

// --------------------------Firebase Methods-------------------------------- //

exports.addToDB = function(guestId, sessionId, voteVal, timestamp) {};

// For post session host review
exports.getFromDB = function(sessionId) {};


// --------------------------Current Sessions-------------------------------- //
// { // Holds all concurrent sessions
//   sessionId1:  { // Used to calculate current average
//     users: {
//       guestId1: 2, // Current voteVals
//       guestId2: 2,
//       guestId40: null
//     }
//     stats: { // Used to calculate session average
//       total: 1323432523,
//       time: 324232
//     }
//   },
//
//   sessionId2: {
//     [...]
//   }
// }