var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('./config');
var dbUtils = require('../utils/dbUtils');

module.exports = function(passport) {
  // Takes a user in the db and stores provider and id as session info
  passport.serializeUser(function(user, done) {
    done(null, {
      provider: user.provider,
      hostId: user.id
    });
  });

  // Takes in userInfo from session and finds its corresponding user in the db
  passport.deserializeUser(function(userInfo, done) {
    dbUtils.findUser(userInfo, function(err, user) {
      done(err, user);
    });
  });

  // Facebook authentication
  passport.use(new FacebookStrategy({
      clientID : config.facebookAuth.clientID,
      clientSecret : config.facebookAuth.clientSecret,
      callbackURL : config.facebookAuth.callbackURL,
      profileFields: ['id', 'displayName']
    },
    function(accessToken, refreshToken, profile, done) {
      dbUtils.getOrCreateProvider('facebook', function(err) {
        if (err) {
          console.error('Failed to get/create Facebook');
        } else {
          // Arguments of provider, profile, callback
          // Stores profile.id, profile.displayName if necessary
          dbUtils.getOrCreateUser('facebook', profile, function(err) {
            if (err) {
              console.error('Failed to get/create user');
            } else {
              done(null, user);
            }
          });
        }
      });
    }
  ));
};
