// holds a given user's current vote

var Backbone = require('backbone');
exports.VoteModel = Backbone.Model.extend({
  // voteVal is initially set to passive state (not registering votes)
  defaults: {
    voteVal: null
  }
});
