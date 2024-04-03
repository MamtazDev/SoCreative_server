const express = require('express');
const { registerUser, loginUser, updateUserInfo,updateCredit } = require('../../controllers/testUser.controller');
const { isAuth } = require('../../middlewares/testAuth');


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.patch('/updateUserInfo', isAuth, updateUserInfo);
router.patch('/updateCredit', isAuth, updateCredit);

module.exports = router;
