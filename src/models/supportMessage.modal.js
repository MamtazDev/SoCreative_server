const mongoose = require('mongoose');

const supportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TestUser',
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
    timestamps: true,
  }
);

const projectCommentSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    comments: {
      type: [commentsSchema],
      required: false,
      deafault: [],
    },
  },
  {
    timestamps: true,
  }
);

const SupportMessage = mongoose.model('SupportMessage', supportSchema);

module.exports = supportSchema;
