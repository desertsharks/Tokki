// holds vote collection
// holds aggregate statistics

var Backbone = require('backbone');
var VotesCollection = require('../collections/VotesCollection').VotesCollection;
var dbUtils = require('../utils/dbUtils');

exports.SessionModel = Backbone.Model.extend({
  initialize: function() {
    this.set('intervalObject', setInterval(this._update.bind(this), this.get('interval')));

    dbUtils.openSessionInDb(this.cid);
  },

  // defaults is a function so VotesCollection is reinstantiated every time
  defaults: function() {
    return {
      votes: new VotesCollection(),

      // Used to compute current average
      sumVoteVals: 0,
      voteCount: 0,

      // Used to compute historical average
      cumSumVoteVals: 0,
      sumVoteCounts: 0,

      stepCount: 0,
      interval: 2000,
      maxAge: 6*60*60*1000 // maxAge is 6 hours
    };
  },

  end: function() {
    clearInterval(this.get('intervalObject'));
    if (this.get('collection')) {
      this.get('collection').removeSession(this.cid);
    }
  },

  // Adds a new user with this id
  addUser: function(userId) {
    this.get('votes').addNewUser(userId);
  },

  // Changes the voteVal of an existing user
  // Updates sumVoteVals and voteCount
  // Returns if voteVals are distinct
  changeVote: function(userId, voteVal) {
    var vote = this.get('votes').get(userId);
    if (!vote) {
      this.addUser(userId);
      vote = this.get('votes').get(userId);
    }
    if (voteVal !== vote.get('voteVal')) {
      this.set('sumVoteVals', this.get('sumVoteVals') + voteVal - vote.get('voteVal'));
      this.set('voteCount', this.get('voteCount') + (voteVal !== null) - (vote.get('voteVal') !== null));
      vote.set('voteVal', voteVal);

      dbUtils.addToDb(this.cid, userId, voteVal, this.get('stepCount'));
    }
  },

  // Updates historical average data every interval
  // Averages by number of votes
  _update: function() {
    if(this.get('stepCount')*this.get('interval') <= this.get('maxAge')) {
      this.set('cumSumVoteVals', this.get('cumSumVoteVals') + this.get('sumVoteVals'));
      this.set('sumVoteCounts', this.get('sumVoteCounts') + this.get('voteCount'));
      this.set('stepCount', this.get('stepCount') + 1);
    } else {
      this.end();
    }
  },

  getCurrentAverage: function() {
    return this.get('sumVoteVals') / this.get('voteCount');
  },

  getHistoricalAverage: function() {
    return this.get('cumSumVoteVals') / this.get('sumVoteCounts');
  }
});
