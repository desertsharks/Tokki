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
var Firebase = require("firebase");

exports.addToDB = function(sessionId, guestId, voteVal, timeStamp) {

  var sessionRef = new Firebase('https://scorching-fire-8470.firebaseio.com/desertShark/');

  //Look up the session ID
  //If it exists, push a new {userID, timeStamp, voteVal} into that session
  if(sessionRef.child(sessionId)){
    sessionRef.child(sessionId).push({
        guestId: guestId,
        voteVal: voteVal,
        timeStamp: timeStamp
       }
    });
  }
  else{  //Create a new session child
   sessionRef.push({
        sessionId: {
          guestId: guestId,
          voteVal: voteVal,
          timeStamp: timeStamp
         }
       });
  }

//Notification of votes for testing purposes
  // ref.on("child_changed", function(snapshot) {
  //   var newVote = snapshot.val();
  //   console.log("User# "+newVote.guestId+ " just voted "  + newVote.voteVal);
  // });


};

exports.getFromDB = function(sessionId){
//Intended for post-session data analysis by host
//Returns data in the form of an array with {userID, timeStamp, voteVal} key-value objects

  var sessionResults = [];
  var sessionRef = new Firebase('https://scorching-fire-8470.firebaseio.com/desertShark/');

  sessionRef.orderByChild("session").equalTo(sessionId).on("child_added", function(snapshot) {
    sessionResults.push(snapshot.key());
  });

 return sessionResults;
};


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
