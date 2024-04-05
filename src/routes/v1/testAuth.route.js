const express = require('express');
const {
  registerUser,
  loginUser,
  updateUserInfo,
  updateCredit,
  getPayments,
  makeSubscription,
} = require('../../controllers/testUser.controller');
const { isAuth } = require('../../middlewares/testAuth');

const router = express.Router();

router.get('/payments', isAuth, getPayments);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/makeSubscription', isAuth, makeSubscription);
router.patch('/updateUserInfo', isAuth, updateUserInfo);
router.patch('/updateCredit', isAuth, updateCredit);

module.exports = router;
