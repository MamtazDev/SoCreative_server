const express = require('express');
const {
  registerUser,
  loginUser,
  updateUserInfo,
  updateCredit,
  getPayments,
  makeSubscription,
  createInviteLink,
  subscriptionPlan,
  getCustomerInvoices,
} = require('../../controllers/testUser.controller');
const { isAuth } = require('../../middlewares/testAuth');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/makeSubscription', isAuth, makeSubscription);
router.post('/subscription-plan', isAuth, subscriptionPlan);
router.get('/subscription-invoices/:customerId', getCustomerInvoices);
router.patch('/updateUserInfo', isAuth, updateUserInfo);
router.patch('/updateCredit', isAuth, updateCredit);
router.get('/payments', isAuth, getPayments);

// invite user route
// router.post('/createStuf', isAuth, createInviteLink);

module.exports = router;
