var Firebase = require("firebase");
var sessionRef = new Firebase('https://scorching-fire-8470.firebaseio.com/desertShark/');

// TODO: Auth

//Opens a new session when created by the host
exports.openSessionInDb =function(sessionId, cb) {
  cb = cb || function(err) {
    if (err) {
      console.error('Failed to open session:', err);
    }
  };
  sessionRef.child(sessionId).set({
    "startTime": Firebase.ServerValue.TIMESTAMP,
    "endTime": null
  }, cb);
};

//Adds an endTime property to sessionId object
exports.closeSessionInDb = function(sessionId) {
  sessionRef.child(sessionId).update({
    "endTime": Firebase.ServerValue.TIMESTAMP
  });
};

//Adds Votes into the database for an existing session
exports.addToDb = function(sessionId, guestId, voteVal, timeStep) {
  var addEntry = function() {
    sessionRef.child(sessionId).push({
      "guestId": guestId,
      "voteVal": voteVal,
      "timeStep": timeStep
    });
  };
  //Look up the session ID
  //If it exists, push a new {userID, timeStamp, voteVal} into that session
  sessionRef.once('value', function(snapshot) {
    if (snapshot.exists()) {
      addEntry();
    } else {
      exports.openSessionInDb(sessionId, function(err) {
        if (err) {
          console.error('Failed to open session:', err);
        } else {
          addEntry();
        }
      });
    }
  }, function(err) {
    console.error('Failed to addToDb:', err);
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
