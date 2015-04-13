// holds all ongoing sessions

var Backbone = require('backbone');
var SessionModel = require('../models/SessionModel').SessionModel;
exports.SessionsCollection = Backbone.Collection.extend({
  model: SessionModel,

  // Adds a new session and returns its unique identifier
  addNewSession: function() {
    var session = new SessionModel();
    this.add(session);
    return session.cid;
  },

  // Wrappers for SessionModel methods for convenience
  addUser: function(sessionId) {
    return this.get(sessionId).addUser();
  },
  changeVote: function(sessionId, userId, voteVal) {
    // Returns [hasChanged, stepCount]
    var changeVoteParams = this.get(sessionId).changeVote(userId, voteVal);
    // If this value has changed
    if(changeVoteParams[0]) {
      // update firebase with sessionid, userid, voteval, and stepCount
      // addEntry(sessionId, userId, voteVal, changeVoteParams[1]);
    }
  },
  getCurrentAverage: function(sessionId) {
    return this.get(sessionId).getCurrentAverage();
  },
  getHistoricalAverage: function(sessionId) {
    return this.get(sessionId).getHistoricalAverage();
  }
});

exports.sessions = new exports.SessionsCollection();
