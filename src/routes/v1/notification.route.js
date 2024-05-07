const express = require('express');

const { isAuth } = require('../../middlewares/testAuth');
const { notificationController } = require('../../controllers');

const router = express.Router();

// isAuth middleware required, need to add

// add notification
router.post('/', notificationController.createNotification);
// seen all notifications by user id
router.post('/seen-my-notify', isAuth, notificationController.seenMyNotifications);

// get All notification based on user id
router.get('/:id', notificationController.getAllNotificationById);

// get notifications logged in user
router.get('/all/me', isAuth, notificationController.getMyNotifications);

// remove notification
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;
