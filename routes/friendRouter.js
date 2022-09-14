const { Router } = require('express');
const router = new Router();
const friendController = require('../controller/friendController');

router.get('/', friendController.getFriends);
router.post('/subscribe', friendController.subscribe);
router.post('/unsubscribe', friendController.unsubscribe);

module.exports = router;
