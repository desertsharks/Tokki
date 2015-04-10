// holds vote collection
// holds aggregate statistics

var Backbone = require('backbone');
var VoteCollection = require('../collections/VoteCollection').VoteCollection;
exports.SessionModel = Backbone.Model.extend({
  initialize: function(params) {
    this.set('votes', new VoteCollection());

    // Used to compute current average
    this.set('sumVotes', 0);
    this.set('countVotes', 0);

    // Used to compute historical average
    this.set('sumSteps', 0);
    this.set('countSteps', 0);

    this.set('interval', params.interval);
    if (this.get('interval') {
      this.set('intervalObject', setInterval(this.update.bind(this), this.get('interval')));
    }
  },

  // Adds a new user and returns its id
  addUser: function() {
    return this.get('votes').create();
  },

  // Changes the voteVal of an existing user
  // Updates sumVotes and countVotes
  // Returns if voteVals are distinct
  changeVote: function(userId, voteVal) {
    var vote = this.get('votes').get(userId);
    if (voteVal !== vote.get('voteVal') {
      this.set('sumVotes', this.get('sumVotes') + voteVal - vote.get('voteVal'));
      this.set('countVotes', this.get('countVotes') + (voteVal !== null) - vote.get('voteVal' !== null));
      vote.set('voteVal', voteVal);
      return true;
    }
    return false;
  },

  // Updates historical average data every interval
  update: function() {
    // Make sure we are not adding NaN (0/0) cases
    if (this.get('countVotes')) {
      this.set('sumSteps', this.get('sumSteps') + this.getCurrentAverage());
      this.set('countSteps', this.get('countSteps') + 1);
    }
  },

  getCurrentAverage: function() {
    return this.get('sumVotes') / this.get('countVotes');
  },

  getHistoricalAverage: function() {
    return this.get('sumSteps') / this.get('countSteps');
  }
};
