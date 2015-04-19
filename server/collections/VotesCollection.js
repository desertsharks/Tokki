// Wrapper for all votes belonging to a SessionModel

var Backbone = require('backbone');
var VoteModel = require('../models/VoteModel').VoteModel;

exports.VotesCollection = Backbone.Collection.extend({
  model: VoteModel,

  // Adds a new user and his or her default vote
  addNewUser: function(userId) {
    this.add(new VoteModel({id: userId}));
  }
});
