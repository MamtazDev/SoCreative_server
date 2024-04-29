//activity modal schema

const mongoose = require('mongoose');

const xNotificationType = [
  'Project Accepted',
  'Event Alert',
  'Project Rejection',
  'Unload Premium Feature',
  'Paid Successful',
  'Exported Project',
];

const activitySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: xNotificationType,
    },
    detailes: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'TestUser',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
