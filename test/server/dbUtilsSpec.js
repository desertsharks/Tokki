var chai = require('chai');
var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;

var Firebase = require('firebase');
var dbUtils = require('../../server/utils/dbUtils');

describe('dbUtils', function() {
  // Test with a different Firebase instance
  var sessionRef = new Firebase('https://amber-fire-3990.firebaseio.com/');
  dbUtils._changeRef(sessionRef);
  var sessionInfo = {
    provider: 'facebook',
    hostId: 'abc',
    sessionId: 'c22'
  };
  var voteInfo = {
    guestId: 'bcd',
    voteVal: 2,
    timeStep: 1
  };
  var voteInfo2 = {
    guestId: 'cde',
    voteVal: 0,
    timeStep: 3
  };

  // All values are changed before any values are read
  before(function(done) {
    sessionRef.set({}, function() {
      dbUtils.updateUser(sessionInfo.provider, {id: sessionInfo.hostId, displayName: 'Dan Stemkoski'}, function() {
        dbUtils.openSessionInDb(sessionInfo, function() {
          dbUtils.addToDb(sessionInfo, voteInfo, function() {
            dbUtils.addToDb(sessionInfo, voteInfo2, function() {
              dbUtils.closeSessionInDb(sessionInfo, done);
            });
          });
        });
      });
    });
  });

  it('creates a new user', function(done) {
    sessionRef.child('facebook').child('abc').child('displayName').once('value', function(snapshot) {
      expect(snapshot.val()).to.equal('Dan Stemkoski');
      done();
    });
  });
  it('creates a new session', function(done) {
    sessionRef.child('facebook').child('abc').child('sessions').child('c22').child('startTime').once('value', function(snapshot) {
      expect(snapshot.val()).to.be.a('number');
      done();
    });
  });
  it('adds entries to a session', function(done) {
    sessionRef.child('facebook').child('abc').child('sessions').child('c22').child('votes').once('value', function(snapshot) {
      var votesObj = snapshot.val();
      var votesArray = Object.keys(votesObj).map(function(key) {
        return votesObj[key];
      });
      if (votesArray[0].guestId === voteInfo.guestId) {
        expect(votesArray).to.deep.equal([voteInfo, voteInfo2]);
      } else {
        expect(votesArray).to.deep.equal([voteInfo2, voteInfo]);
      }
      done();
    });
  });
  it('closes an existing session', function(done) {
    sessionRef.child('facebook').child('abc').child('sessions').child('c22').child('endTime').once('value', function(snapshot) {
      expect(snapshot.val()).to.be.a('number');
      done();
    });
  });
  it('gets session data from the database', function(done) {
    dbUtils.getFromDb(sessionInfo, function(err, data) {
      expect(data.startTime).to.be.a('number');
      expect(data.endTime).to.be.a('number');
      expect(data.votes).to.deep.equal([voteInfo, voteInfo2]);
      done();
    });
  });
});
