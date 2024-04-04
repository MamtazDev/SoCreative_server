const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TestUser',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isSeen: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    _id: false,
    timestamps: true,
  }
);

const contactUsSchema = new mongoose.Schema(
  {
    helpSeeker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TestUser',
      required: true,
    },
    messages: {
      type: [messagesSchema],
      required: false,
      deafault: [],
    },
  },
  {
    timestamps: true,
  }
);

const ContactUs = mongoose.model('ContactUs', contactUsSchema);

module.exports = ContactUs;
