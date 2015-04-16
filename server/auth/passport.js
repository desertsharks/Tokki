var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('./config');

module.exports = function(passport) {
  // Facebook authentication
  passport.use(new FacebookStrategy({
      clientID : config.facebookAuth.clientID,
      clientSecret : config.facebookAuth.clientSecret,
      callbackURL : config.facebookAuth.callbackURL,
      profileFields: ['id', 'displayName']
    },
    function(accessToken, refreshToken, profile, done) {
      // Store accessToken, profile.id, profile, displayName in firebase
    }
  ));
};
