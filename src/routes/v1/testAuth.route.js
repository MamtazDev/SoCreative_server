const express = require('express');
const { registerUser, loginUser, updateUserInfo } = require('../../controllers/testUser.controller');
const { isAuth } = require('../../middlewares/testAuth');
const { upload } = require('../../config/multer');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.patch('/updateUserInfo', isAuth, upload.single('image'), updateUserInfo);

module.exports = router;
