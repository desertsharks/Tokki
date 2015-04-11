var guestController = require('../controllers/guestController');

module.exports = function(app) {
  app.post('/new', guestController.registerGuest);

  // Handles socket.io connection routing

  // Listens for guest websocket events
  // Calls update
  exports.listener = function() {};

}
