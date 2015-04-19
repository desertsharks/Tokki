// Holds a user's current vote

var Backbone = require('backbone');

exports.VoteModel = Backbone.Model.extend({
  // Defaults to a passive state (not registering votes)
  defaults: {
    voteVal: null
  }
});
