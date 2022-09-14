const { Router } = require('express');
const router = new Router();
const postController = require('../controller/postController');

router.post('/:postId', postController.likePost);

module.exports = router;
