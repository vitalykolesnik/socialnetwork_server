const { Router } = require('express');

const router = new Router();
const profileController = require('../controller/profileController');

const upload = require('../middleware/uploadMiddleware');

router.get('/', profileController.getUsers);
router.get('/me', profileController.getMe);
router.get('/:id', profileController.getProfile);
router.get('/status/:id', profileController.getProfileStatus);
router.put('/status', profileController.updateProfileStatus);
router.put('/photo', upload.single('image'), profileController.updatePhoto);

module.exports = router;
