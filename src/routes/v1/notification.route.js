const express = require('express');

const { isAuth } = require('../../middlewares/testAuth');
const { notificationController } = require('../../controllers');

const router = express.Router();

// isAuth middleware required, need to add


// add notification 
router.post('/',  notificationController.createNotification);

// get All notification based on user id
router.get('/:id',  notificationController.getAllNotificationById);

// remove notification 
router.delete('/:id',  notificationController.deleteNotification);





module.exports = router;
