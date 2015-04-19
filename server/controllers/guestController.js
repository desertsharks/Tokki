var sessions = require('../collections/SessionsCollection').sessions;

// Redirects any "guest/sessionId" path to the angular guest page
exports.redirect = function(req, res) {
  res.redirect('/#/guest/' + (req.params.sessionId || ''));
};
