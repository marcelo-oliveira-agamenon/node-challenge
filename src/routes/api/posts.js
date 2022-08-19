const express = require('express');
const router = express.Router();
const postController = require('../../controllers/postsController');
const verifyToken = require('../../helpers/verifyToken');

router.use(verifyToken);
router.get('/api/posts', postController.fetchAll);
router.get('/api/posts/:id', postController.fetchOne);
router.post('/api/posts', postController.createPost);
router.put('/api/posts/:id', postController.editPost);
router.delete('/api/posts/:id', postController.deletePost);

module.exports = router;
