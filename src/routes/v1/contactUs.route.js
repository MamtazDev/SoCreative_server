const express = require('express');
const { isAuth, isAdmin } = require('../../middlewares/testAuth');
const { contactUsController } = require('../../controllers');

const router = express.Router();

router.post('/add', isAuth, contactUsController.makeContact);
router.post('/autoReply', isAuth, contactUsController.generateAutoReply);

router.get('/me', isAuth, contactUsController.userContactMessage);
router.get('/all', isAdmin, contactUsController.allContactMessage);
router.get('/:id', isAuth, contactUsController.contactMessgeById);

module.exports = router;
