var hostController = require('../controllers/hostController');

module.exports = function(app) {
  app.post('/login', hostController.login);

  // Handles socket.io connection routing
};
