const { Router } = require('express');
const router = new Router();
const authController = require('../controller/authController');

router.get('/usersAll', authController.getAll);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;
