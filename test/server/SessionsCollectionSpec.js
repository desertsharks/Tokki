var chai = require('chai');
var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;

var SessionsCollection = require('../../server/collections/SessionsCollection').SessionsCollection;

describe('SessionsCollection', function() {
  var sessions;

  beforeEach(function() {
    sessions = new SessionsCollection();
  });

  describe('session', function() {
    it('creates a new session', function() {
      var sessionId = sessions.addNewSession();
      expect(sessionId).to.be.a('string');
      // console.log('sessionId: ', sessionId);
    });
    it('adds a new user to a session', function() {
      var sessionId = sessions.addNewSession();
      var userId = sessions.addUser(sessionId);
      expect(userId).to.be.a('string');
      // console.log('userId: ', userId);
    });
    it('changes a user\'s vote', function() {
      var sessionId = sessions.addNewSession();
      var userId = sessions.addUser(sessionId);
      assert.notEqual(sessions.getCurrentAverage(sessionId), sessions.getCurrentAverage(sessionId)); // Assert average to be NaN
      sessions.changeVote(sessionId, userId, 2);
      expect(sessions.getCurrentAverage(sessionId)).to.equal(2);
    });
    it('calculates a historical average', function() {
      var sessionId = sessions.addNewSession();
      var userId = sessions.addUser(sessionId);
      sessions.changeVote(sessionId, userId, 2);
      assert.notEqual(sessions.getHistoricalAverage(sessionId), sessions.getHistoricalAverage(sessionId)); // Assert average to be NaN
      sessions.get(sessionId).update();
      expect(sessions.getHistoricalAverage(sessionId)).to.equal(2);
    });
    it('returns whether and when the vote changed', function() {
      var sessionId = sessions.addNewSession();
      var userId = sessions.addUser(sessionId);

      sessions.get(sessionId).update();
      var changeVoteParams1 = sessions.get(sessionId).changeVote(userId, 2);
      expect(changeVoteParams1[0]).to.be.true;
      expect(changeVoteParams1[1]).to.equal(1);

      sessions.get(sessionId).update();
      var changeVoteParams2 = sessions.get(sessionId).changeVote(userId, 2);
      expect(changeVoteParams2[0]).to.be.false;
      expect(changeVoteParams2[1]).to.equal(2);
    });
  });
});
