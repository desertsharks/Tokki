var chai = require('chai');
var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;

var SessionsCollection = require('../../server/collections/SessionsCollection').SessionsCollection;

describe('SessionsCollection', function() {
  var sessions, sessionId, userId;

  beforeEach(function() {
    sessions = new SessionsCollection();
    sessionId = sessions.addNewSession();
    userId = '0-EbQqhSIEZK8R8KAAAB';
    sessions.addUser(sessionId, userId);
  });

  describe('session', function() {
    it('creates a new session', function() {
      expect(sessionId).to.be.a('string');
    });
    it('changes a user\'s vote', function() {
      assert.notEqual(sessions.getCurrentAverage(sessionId), sessions.getCurrentAverage(sessionId)); // Assert average to be NaN
      sessions.changeVote(sessionId, userId, 2);
      expect(sessions.getCurrentAverage(sessionId)).to.equal(2);
    });
    it('calculates a historical average', function() {
      sessions.changeVote(sessionId, userId, 2);
      assert.notEqual(sessions.getHistoricalAverage(sessionId), sessions.getHistoricalAverage(sessionId)); // Assert average to be NaN
      sessions.get(sessionId)._update();
      expect(sessions.getHistoricalAverage(sessionId)).to.equal(2);
    });
    it('returns whether and when the vote changed', function() {
      sessions.get(sessionId)._update();
      var changeVoteParams1 = sessions.changeVote(sessionId, userId, 2);
      expect(changeVoteParams1[0]).to.equal(true);
      expect(changeVoteParams1[1]).to.equal(1);

      sessions.get(sessionId)._update();
      var changeVoteParams2 = sessions.changeVote(sessionId, userId, 2);
      expect(changeVoteParams2[0]).to.equal(false);
      expect(changeVoteParams2[1]).to.equal(2);
    });
    it('will have no effect if a user is added twice', function() {
      sessions.changeVote(sessionId, userId, 2);
      sessions.addUser(sessionId, userId);
      var changeVoteParams = sessions.changeVote(sessionId, userId, 2);
      expect(changeVoteParams[0]).to.equal(false);
    });
    it('will create a user if the vote of a non-existent user is changed', function() {
      userId = 'aBP9S-wzDhqJFBwfAAAC';
      var changeVoteParams = sessions.changeVote(sessionId, userId, 2);
      expect(changeVoteParams[0]).to.equal(true);
    });
  });
});
