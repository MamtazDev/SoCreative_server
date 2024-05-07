/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
const express = require('express');
const { isAuth } = require('../../middlewares/testAuth');
const { sendInvite, verifyInviteToken } = require('../../controllers/helper.controller');
const router = express.Router();

router.post('/invite', isAuth, sendInvite);
router.post('/verify-invite-token', verifyInviteToken);

module.exports = router;
