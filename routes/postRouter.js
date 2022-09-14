const { Router } = require('express');
const router = new Router();
const postController = require('../controller/postController');
const upload = require('../middleware/uploadMiddleware');

router.get('/', postController.getAllPosts);
router.get('/:profileId', postController.getPosts);
router.post('/', upload.array('image', 6), postController.createPost);
router.delete('/:postId', postController.deletePost);

module.exports = router;
