// holds all ongoing sessions

var Backbone = require('backbone');
var SessionModel = require('../models/SessionModel').SessionModel;
var dbUtils = require('../utils/dbUtils');

exports.SessionsCollection = Backbone.Collection.extend({
  model: SessionModel,

  // Adds a new session and returns its unique identifier
  addNewSession: function() {
    var session = new SessionModel({collection: this});
    this.add(session);
    return session.cid;
  },
  removeSession: function(sessionId) {
    if(this.remove(sessionId)) {
      dbUtils.closeSessionInDb(sessionId);
    }
  },

  // Wrappers for SessionModel methods for convenience
  addUser: function(sessionId, userId) {
    if (this.get(sessionId)) {
      this.get(sessionId).addUser(userId);
    }
  },
  changeVote: function(sessionId, userId, voteVal) {
    // Returns hasChanged
    if (this.get(sessionId)) {
      this.get(sessionId).changeVote(userId, voteVal);
    }
  },
  getCurrentAverage: function(sessionId) {
    if (this.get(sessionId)) {
      return this.get(sessionId).getCurrentAverage();
    }
  },
  getHistoricalAverage: function(sessionId) {
    if (this.get(sessionId)) {
      return this.get(sessionId).getHistoricalAverage();
    }
  },
  getUserCount: function(sessionId) {
    if (this.get(sessionId)) {
      return this.get(sessionId).getUserCount();
    }
  }
});

// Exports instance for server use and constructor for testing
exports.sessions = new exports.SessionsCollection();
