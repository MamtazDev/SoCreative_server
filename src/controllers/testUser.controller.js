const bcrypt = require('bcryptjs');
const User = require('../models/testUser.model');

const Drive = require('../models/drive.model');
const { removeSensitiveInfo, generateToken } = require('../middlewares/testAuth');
const Payment = require('../models/payment.model');

const Stripe = require('stripe');

const stripe = new Stripe(
  'sk_test_51M6wx2EMTQyMb7XDXr8kxdPREQqV4XJTPMgX7aPcKO7bKiSnmBEv9uLfap1hcYJiwEGg7yfE9PGT4C5XrFUERsXr00HhSFnd44'
);

const registerUser = async (req, res) => {
  try {
    const isExist = await User.findOne({ email: req.body.email });

    if (isExist) {
      return res.status(403).send({
        message: `${req.body.email} is already Exist!`,
        success: false,
      });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        role: req.body.role,
      });

      const user = await newUser.save();

      const newDrive = new Drive({ user: user._id });
      const drive = await newDrive.save();
      const token = await generateToken(user);
      res.status(200).send({
        message: 'Account created  successfully',
        success: true,
        user: removeSensitiveInfo(user),
        accessToken: token,
        drive,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({
        success: false,
        type: 'email',
        message: 'User not found',
      });
    }

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const accessToken = await generateToken(user);
      return res.status(200).send({
        success: true,
        message: 'Logged in successfully',
        user: removeSensitiveInfo(user),
        accessToken,
      });
    } else {
      res.status(401).send({
        success: false,
        type: 'password',
        message: 'Invalid password',
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
      success: false,
    });
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const isExist = await User.findOne({ _id: req.user._id });

    if (isExist) {
      const result = await User.findByIdAndUpdate(req.user._id, req.body, {
        new: true,
      });
      res.status(200).json({
        success: true,
        message: 'User Info Update successfully',
        data: removeSensitiveInfo(result),
      });
    } else {
      res.status(201).json({
        success: false,
        message: 'Update unsuccessful',
      });
    }
  } catch (error) {
    res.status(201).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCredit = async (req, res) => {
  try {
    const isExist = await User.findOne({ _id: req.user._id });

    if (isExist) {
      const result = await User.findByIdAndUpdate(
        req.user._id,
        { credit: req.body.credit },
        {
          new: true,
        }
      );
      res.status(200).json({
        success: true,
        message: 'User Info Update successfully',
        data: removeSensitiveInfo(result),
      });
    } else {
      res.status(201).json({
        success: false,
        message: 'Update unsuccessful',
      });
    }
  } catch (error) {
    res.status(201).json({
      success: false,
      message: error.message,
    });
  }
};

const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id })
      .populate({ path: 'user', select: '-password' })
      .sort({ createdAt: -1 });
    res.status(200).send(payments);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

const makeSubscription = async (req, res) => {
  try {
    console.log(req.body, 'jfklasjdfkl');
    const newPayment = new Payment(req.body);
    const payment = await newPayment.save();
    res.status(200).json({
      success: true,
      message: 'Subscription created successfully!',
      data: payment,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

const subscriptionPlan = async (req, res) => {
  const customer = await stripe.customers.create({
    name: req.user.name,
    email: req.user?.email,
    payment_method: req.body.paymentMethod,
    invoice_settings: {
      default_payment_method: req.body.paymentMethod,
    },
  });

  // create a stripe subscription
  const product = await stripe.products.create({
    name: 'Monthly subscription',
  });
  // Create a subscription
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      {
        price_data: {
          currency: 'usd',
          product: product.id,
          unit_amount: req.body.amount * 1,
          recurring: {
            interval: req.body.plan,
          },
        },
      },
    ],

    payment_settings: {
      payment_method_types: ['card'],
      save_default_payment_method: 'on_subscription',
    },
    expand: ['latest_invoice.payment_intent'],
  });

  const invoices = await stripe.invoices.list({
    customer: customer.id,
    limit: 10, // Limit the number of invoices returned (optional)
  });
  // Send back the client secret for payment
  res.json({
    success: true,
    invoices,
    message: 'Subscription successfully initiated',
    clientSecret: subscription.latest_invoice.payment_intent.client_secret,
  });
};

const getCustomerInvoices = async (req, res) => {
  try {
    const { customerId } = req.params;
    // Retrieve invoices for the specified customer
    const invoices = await stripe.invoices.list({
      customer: customerId,
      limit: 10, // Limit the number of invoices returned (optional)
    });
    res.json({ invoices: invoices.data });
  } catch (error) {
    console.error('Error retrieving customer invoices:', error);
    res.status(500).json({ error: 'Failed to retrieve customer invoices' });
  }
};

// const createInviteLink = async (req, res) => {
//   try {
//     console.log("req.body", req.body);

//     const newPayment = new Payment(req.body);
//     const payment = await newPayment.save();
//     res.status(200).json({
//       success: true,
//       message: 'Subscription created successfully!',
//       data: payment,
//     });
//   } catch (error) {
//     res.status(401).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

module.exports = {
  registerUser,
  loginUser,
  updateUserInfo,
  updateCredit,
  getPayments,
  makeSubscription,
  subscriptionPlan,
  getCustomerInvoices,
  // createInviteLink
};
