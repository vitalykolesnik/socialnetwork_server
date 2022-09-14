const { Router } = require('express');
const router = new Router();
const authRouter = require('./authRouter');
const profileRouter = require('./profileRouter');
const postRouter = require('./postRouter');
const friendRouter = require('./friendRouter');
const likeRouter = require('./likeRouter');

router.use('/', authRouter);
router.use('/users', profileRouter);
router.use('/friends', friendRouter);
router.use('/posts', postRouter);
router.use('/like', likeRouter);

module.exports = router;
