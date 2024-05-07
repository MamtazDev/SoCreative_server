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
    image: {
      type: String,
      required: false,
    },
    credit: {
      type: Number,
      required: false,
      default: 0,
    },
    currentPlan: {
      type: String,
      required: false,
    },
    subscriptionExpierDate: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ['USER', 'EDITOR', 'ADMIN', 'MANAGER'],
      default: 'USER',
    },
  },
  {
    timestamps: true,
  }
);

const TestUser = mongoose.model('TestUser', userSchema);

module.exports = TestUser;
