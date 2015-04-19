var guestController = require('../controllers/guestController');

module.exports = function(app) {
  app.get('/:sessionId', guestController.redirect);
  app.get('/', guestController.redirect);
};
