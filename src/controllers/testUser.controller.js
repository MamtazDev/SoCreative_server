const bcrypt = require('bcryptjs');
const User = require('../models/testUser.model');

const Drive = require('../models/drive.model');
const { removeSensitiveInfo, generateToken } = require('../middlewares/testAuth');
const Payment = require('../models/payment.model');

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
  // createInviteLink
};
