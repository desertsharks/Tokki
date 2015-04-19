var Firebase = require('firebase');
var dBRef = new Firebase('https://scorching-fire-8470.firebaseio.com/desertShark/');

// Helper methods
var defaultCb = function(message) {
  message = message || 'Failed to access database';
  return function(err) {
    if (err) {
      console.error(message, err);
    }
  };
};
var sessionRef = function(sessionInfo) {
  return dBRef.child(sessionInfo.provider).child(sessionInfo.hostId).child('sessions').child(sessionInfo.sessionId);
};
var validateSession = function(sessionInfo) {
  return sessionInfo && sessionInfo.provider && sessionInfo.hostId && sessionInfo.sessionId;
};

// Opens a new session when created by the host
exports.openSessionInDb =function(sessionInfo, cb) {
  if(!validateSession(sessionInfo)) {
    return;
  }
  cb = cb || defaultCb('Failed to open session');
  sessionRef(sessionInfo).set({
    startTime: Firebase.ServerValue.TIMESTAMP
  }, cb);
};

// Adds an endTime property to sessionInfo object
exports.closeSessionInDb = function(sessionInfo, cb) {
  if(!validateSession(sessionInfo)) {
    return;
  }
  cb = cb || defaultCb('Failed to close session');
  sessionRef(sessionInfo).update({
    endTime: Firebase.ServerValue.TIMESTAMP
  }, cb);
};

// Adds Votes into the database for an existing session
exports.addToDb = function(sessionInfo, voteInfo, cb) {
  if(!validateSession(sessionInfo)) {
    return;
  }
  cb = cb || defaultCb('Failed to add entry');
  sessionRef(sessionInfo).child('votes').push(voteInfo, cb);
};

// Intended for post-session data analysis by host
// Returns data in the form of an object: {
//   startTime: 1429426355540,
//   endTime: 1429426355326,
//   votes: [
//     {
//       guestId: 'bcd',
//       timeStep: 1,
//       voteVal: 2
//     },
//     ...
//   ]
// }
exports.getFromDb = function(sessionInfo, cb) {
  cb = cb || defaultCb('Failed to retreive session data');
  if(!validateSession(sessionInfo)) {
    return cb('getFromDb: sessionInfo params not specified');
  }

  var sessionResults = {votes: []};
  sessionRef(sessionInfo).once('value', function(snapshot) {
      var sessionObj = snapshot.val();
      sessionResults.startTime = sessionObj.startTime;
      sessionResults.endTime = sessionObj.endTime;
      var remaining = Object.keys(sessionObj.votes).length;

      // Called once for each child_added event, fires when all are complete
      var oneDone = function() {
        remaining--;
        if (!remaining) {
          sessionRef(sessionInfo).child('votes').orderByKey().off('child_added', onChildAdded);
          cb(null, sessionResults);
        }
      };
      // Edge case of no votes where oneDone would never be called otherwise
      if (!remaining) {
        remaining++;
        oneDone();
      }

      var onChildAdded = sessionRef(sessionInfo).child('votes').orderByKey().on('child_added', function(snapshot) {
          sessionResults.votes.push(snapshot.val());
          oneDone();
        }, function (errorObject) {
          return cb('Reading from db failed: ' + errorObject.code);
      });
    }, function (errorObject) {
      return cb('Reading from db failed: ' + errorObject.code);
  });
};

// Firebase creates the user if entry does not exist
exports.updateUser = function(provider, profile, cb) {
  cb = cb || defaultCb('Failed to create user');
  dBRef.child(provider).child(profile.id).update({displayName:profile.displayName}, cb);
};

// Switches to a new ref for testing purposes
exports._changeRef = function(newRef) {
  dBRef = newRef || dBRef;
};
