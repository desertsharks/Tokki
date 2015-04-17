var Firebase = require('firebase');
var sessionRef = new Firebase('https://scorching-fire-8470.firebaseio.com/desertShark/');

// TODO: Auth
// sessionInfo is now an object, not a string
// provider, hostId, sessionId
//
// if provider does not exist, add provider
//  - provider, callback
// if user does not exist, add user
//  - provider, profile, callback  (provider ex: "facebook", profile: {id, displayName})

//Opens a new session when created by the host
exports.openSessionInDb =function(sessionInfo, cb) {
  cb = cb || function(err) {
    if (err) {
      console.error('Failed to open session:', err);
    }
  };
  sessionRef.child(sessionInfo.sessionId).set({
    startTime: Firebase.ServerValue.TIMESTAMP,
    endTime: null
  }, cb);
};

//Adds an endTime property to sessionInfo object
exports.closeSessionInDb = function(sessionInfo) {
  sessionRef.child(sessionInfo.sessionId).update({
    endTime: Firebase.ServerValue.TIMESTAMP
  });
};

//Adds Votes into the database for an existing session
exports.addToDb = function(sessionInfo, voteInfo) {
  var addEntry = function() {
    sessionRef.child(sessionInfo.sessionId).push(voteInfo);
  };
  //Look up the session ID
  //If it exists, push a new {userID, timeStamp, voteVal} into that session
  sessionRef.once('value', function(snapshot) {
    if (snapshot.exists()) {
      addEntry();
    } else {
      exports.openSessionInDb(sessionInfo, function(err) {
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

exports.getFromDb = function(sessionInfo) {
//Intended for post-session data analysis by host
//Returns data in the form of an array with {userID, timeStamp, voteVal} key-value objects

  var sessionResults = [];

  sessionRef.orderByChild('session').equalTo(sessionInfo.sessionId).on('child_added', function(snapshot) {
    sessionResults.push(snapshot.key());
  });

  return sessionResults;
};
