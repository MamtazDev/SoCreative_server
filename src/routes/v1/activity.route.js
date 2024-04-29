/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router();
const { isAuth } = require('../../middlewares/testAuth');
const { createActivity, myActivities } = require('../../controllers/activity.contoller');

router.post('/create', isAuth, createActivity);
router.get('/my-activities', isAuth, myActivities);

module.exports = router;
