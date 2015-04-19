var chai = require('chai');
var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;

// Firebase and Node archive server must be running for these tests to pass.
var Firebase = require("firebase");
var request = require("request");

xdescribe("Firebase data storage", function() {
  beforeEach(function() {
    var sessionRef = new Firebase('https://scorching-fire-8470.firebaseio.com/desertShark/');
    var archiveVote1 = {sessionId: {
          guestId: "randomGuy",
          voteVal: 0,
          timeStamp: 12356
         }};
    var archiveVote2 = {sessionId: {
          guestId: "randomGal",
          voteVal: 1,
          timeStamp: 34567
         }};
  });

  var sessionRef = new Firebase('https://scorching-fire-8470.firebaseio.com/desertShark/');

  it("Should store votes in Firebase", function(done) {
    var sessionRef = new Firebase('https://scorching-fire-8470.firebaseio.com/desertShark/');
    var archiveVote1 = {sessionId: {
          guestId: "randonGuy",
          voteVal: 0,
          timeStamp: 12356
         }};

    // Open a session
    // Post a vote
    // Read vote
    request(
      {
        method: "POST",
        uri: archiveServer,
        form: archiveForm
      },
      function(error, response, body) {
        waits(1000);

        runs(function() {
          mongoClient.open(function(err, p_client) {
            var collectionName = "archive";
            client.createCollection(collectionName, function(err, collection) {
              collection.find().toArray(function(err, results) {

                // Should have one result:
                expect(results.length).toEqual(1);
                expect(results[0].pageSource).toMatch(/Google/);

                done();
              });
            });
          });
        });
      }
    );
  });

  it("Should retrieve votes from Firebase", function(done) {
    mongoClient.open(function(err, p_client) {
      var collectionName = "archive";
      client.createCollection(collectionName, function(err, collection) {

        var document = {url: "jono.com",
                        pageSource: "<html></html>" };

        collection.insert(document, function(err, docs) {

          var archivedPage = "http://127.0.0.1:8080/jono.com";

          request(archivedPage, function(error, response, body) {
            expect(body)
              .toMatch(/Jono's Awesome Blank Page/);
            done();
          });
        });
      });
    });
  });
});
