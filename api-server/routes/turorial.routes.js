module.exports = (app) => {
  const controllers = require('../controllers/tutorial.controller.js');
  const multer = require('multer');
  const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 50 * 1024 * 1024 } });
  const router = require('express').Router();

  router.post('/sendForm', controllers.sendForm);
  router.post('/sendConstructor', upload.any(), controllers.sendConstructor);
  router.post('/sendTextileOrder', controllers.sendTextileOrder);

  app.use('/api', router);
};
