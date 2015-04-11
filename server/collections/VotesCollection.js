// wrapper for all votes belonging to a SessionModel

var Backbone = require('backbone');
var VoteModel = require('../models/VoteModel').VoteModel;
exports.VotesCollection = Backbone.Collection.extend({
  model: VoteModel,

  // Creates a new vote and returns its unique identifier
  create: function() {
    return exports.VoteCollection.prototype.create.apply(this, arguments).cid;
  }
});
