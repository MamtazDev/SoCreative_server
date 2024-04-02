const mongoose = require('mongoose');

const projectReviewSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TestUser',
      required: true,
    },
    rating: {
      type: Number,
      required: false,
      default: 0,
    },
    comments: {
      type: String,
      required: false,
      default: '',
    },
    suggestions: {
      type: String,
      required: false,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const ProjectReview = mongoose.model('ProjectReview', projectReviewSchema);

module.exports = ProjectReview;
