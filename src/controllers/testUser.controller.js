const bcrypt = require('bcryptjs');
const User = require('../models/testUser.model');

const Drive = require('../models/drive.model');
const { removeSensitiveInfo, generateToken } = require('../middlewares/testAuth');

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

module.exports = {
  registerUser,
  loginUser,
};
