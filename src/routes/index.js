const express = require('express');
const router = express.Router();
const verifyToken = require('../helpers/verifyToken');

const postController = require('../controllers/postsController');

//router.use(verifyToken);
router.get('/api/posts', postController.fetchAll);
router.post('/api/posts', postController.createPost);

module.exports = router;
