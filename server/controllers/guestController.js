var sessions = require('../collections/SessionsCollection').sessions;

exports.redirect = function(req, res) {
  res.redirect('/#/guest/' + (req.params.sessionId || ''));
};
