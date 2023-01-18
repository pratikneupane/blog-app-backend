const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller.js');
const auth = require('../middleware/auth');

router.post('/', auth, postController.createPost);
router.get('/', auth, postController.getAllPosts);
router.get('/:id', auth, postController.getPost);
router.put('/:id', auth, postController.updatePost);
router.delete('/:id', auth, postController.deletePost);

module.exports = router;
