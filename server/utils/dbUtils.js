var Firebase = require("firebase");

// TODO: Auth

exports.openSessionInDb =function(sessionId) {
//Opens a new session when created by the host
  var dbRef = new Firebase('https://scorching-fire-8470.firebaseio.com/desertShark/');
  dbRef.child(sessionId).set({
    "startTime": Date.now(),
    "endTime": null
  });
};

exports.closeSessionInDb = function(sessionId) {
//Adds an endTime property to sessionId object
  var dbRef = new Firebase('https://scorching-fire-8470.firebaseio.com/desertShark/');
  dbRef.child(sessionId).update({
    "endTime": Date.now()
  });
};

exports.addToDb = function(sessionId, guestId, voteVal, timeStep) {
//Adds Votes into the database for an existing session
  var sessionRef = new Firebase('https://scorching-fire-8470.firebaseio.com/desertShark/');

  //Look up the session ID
  //If it exists, push a new {userID, timeStamp, voteVal} into that session
  if(!sessionRef.child(sessionId).val()) {
    exports.openSessionInDb(sessionId);
  }
  sessionRef.child(sessionId).push({
    "guestId": guestId,
    "voteVal": voteVal,
    "timeStep": timeStep
  });

//Notification of votes for testing purposes
  // ref.on("child_changed", function(snapshot) {
  //   var newVote = snapshot.val();
  //   console.log("User# "+newVote.guestId+ " just voted "  + newVote.voteVal);
  // });
};

exports.getFromDb = function(sessionId) {
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
