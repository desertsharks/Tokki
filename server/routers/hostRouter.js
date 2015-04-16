var hostController = require('../controllers/hostController');

module.exports = function(app, passport) {
  app.get('/login/facebook', passport.authenticate('facebook'));
  app.post('/logout', hostController.logout);
  app.post('/new', isLoggedIn, hostController.registerSession);
  app.get('/old', isLoggedIn, hostController.retrieveSessions);
  app.get('/:sessionId', hostController.redirect);
  app.get('/', hostController.redirect);
};

var isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};
