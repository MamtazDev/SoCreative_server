require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = async (user) => {
  return jwt.sign(
    {
      name: user.name,
      email: user.email,
      _id: user?._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '7days',
    }
  );
};

const isAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    if (!authHeader) {
      return res.status(401).send({
        message: 'Unathorized',
      });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
      if (err) {
        return res.status(403).send({ message: 'Forbidden Access' });
      }
      req.user = decoded;
      next();
    });
  } catch (err) {
    res.status(401).send({
      message: err.message,
    });
  }
};

const removeSensitiveInfo = (user) => {
  const { password, updatedAt, __v, createdAt, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
};

const isAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    if (!authHeader) {
      return res.status(401).send({
        message: 'Unauthorized',
      });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
      if (err) {
        return res.status(403).send({ message: 'Forbidden Access' });
      }
      if (decoded.role === 'Admin') {
        req.user = decoded;
        next();
      } else {
        return res.status(403).send({ message: 'Forbidden Access' });
      }
    });
  } catch (err) {
    res.status(401).send({
      message: err.message,
    });
  }
};

module.exports = {
  isAuth,
  isAdmin,
  generateToken,
  removeSensitiveInfo,
};
