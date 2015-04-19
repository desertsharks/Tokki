var hostController = require('../controllers/hostController');

module.exports = function(app) {
  app.post('/login', hostController.login);
  app.post('/new', hostController.registerSession);
  app.get('/:sessionId', hostController.redirect);
  app.get('/', hostController.redirect);
};
