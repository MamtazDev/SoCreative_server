const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['USER', 'EDITOR', 'ADMIN'],
      default: 'USER',
    },
  },
  {
    timestamps: true,
  }
);

const TestUser = mongoose.model('TestUser', userSchema);

module.exports = TestUser;
