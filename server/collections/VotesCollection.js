// wrapper for all votes belonging to a SessionModel

var Backbone = require('backbone');
var VoteModel = require('../models/VoteModel').VoteModel;
exports.VotesCollection = Backbone.Collection.extend({
  model: VoteModel,

  // Adds a new user and his or her default vote and returns its unique identifier
  addNewUser: function() {
    var user = new VoteModel();
    this.add(user);
    return user.cid;
  }
});
