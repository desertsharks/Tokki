// holds all ongoing sessions

var Backbone = require('backbone');
var SessionModel = require('../models/SessionModel').SessionModel;
var SessionsCollection = Backbone.Collection.extend({
  model: SessionModel,

  // Creates a new session and returns its unique identifier
  create: function() {
    return exports.SessionsCollection.prototype.create.apply(this, arguments).cid;
  },

  // Wrappers for SessionModel methods for convenience
  addUser: function(sessionId) {
    return this.get(sessionId).addUser();
  },
  changeVote: function(sessionId, userId, voteVal) {
    // If this value has changed
    if(this.get(sessionId).changeVote(userId, voteVal)) {
      // update firebase with sessionid, userid, voteval, and stepCount
    }
  },
  getCurrentAverage: function(sessionId) {
    return this.get(sessionId).getCurrentAverage;
  },
  getHistoricalAverage: function(sessionId) {
    return this.get(sessionId).getHistoricalAverage;
  }
});

exports.sessions = new SessionsCollection();
