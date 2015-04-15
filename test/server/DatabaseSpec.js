var chai = require('chai');
var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;

/* You'll need to have Firebase and your Node archive server
 * running for these tests to pass. */

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

  //var mongoServer = new mongodb.Server("127.0.0.1", 27017, {}); //replace with Node server

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
    request({method: "POST",
             uri: archiveServer,
             form: archiveForm
            },
            function(error, response, body) {
              /* Now if we look in the database, we should find the
               * posted message there. */

              // Wait a second for it to be done archiving
              waits(1000);

              runs(function() {
                mongoClient.open(function(err, p_client) {
                  /* TODO edit this variable to match the name of
                   * the collection you're using: */
                  var collectionName = "archive";
                  client.createCollection(collectionName, function(err, collection) {
                    collection.find().toArray(function(err, results) {
                      // Should have one result:
                      expect(results.length).toEqual(1);

                      /* TODO edit this test to match the name of the
                       * property where you're storing the page source:*/
                      expect(results[0].pageSource)
                        .toMatch(/Google/);

                      done();
                    });
                  });
                });
              });
            });
  });

  it("Should retrieve votes from Firebase", function(done) {
    mongoClient.open(function(err, p_client) {
      /* TODO edit this variable to match the name of
       * the collection you're using: */
      var collectionName = "archive";
      client.createCollection(collectionName, function(err, collection) {

        /* We'll insert some fake page source data into
         * the collection to simulate an archived page. Edit this
         * to match the document field names that your code
         * actually uses.*/
        var document = {url: "jono.com",
                        pageSource: "<html></html>" };

        collection.insert(document, function(err, docs) {

          /* Now do a request to the archive server for this url
           *and expect it to return the document.
           * TODO edit these variables to match the interface of
           * your archive server. */
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
