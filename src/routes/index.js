const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');
const postsRouter = require('./api/posts');

const tokenController = require('../controllers/tokenController');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));
router.get('/api/token', tokenController.createToken);
router.use(postsRouter);
module.exports = router;
