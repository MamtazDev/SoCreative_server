const express = require('express');
const inviteController = require('../../controllers/invite.controller');

const router = express.Router();

router.post('/create',  inviteController.create);
router.post('/redeem',  inviteController.redeem);

router.post("/create/multi_email", inviteController.multiEmail )

module.exports = router;