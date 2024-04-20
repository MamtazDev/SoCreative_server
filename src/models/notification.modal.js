//notification schema 

const mongoose = require('mongoose');


const xNotificationType = ["Project Accepted", "Event Alert", "Project Rejection", "Unload Premium Feature", "Paid Successful", "Exported Project"]


const notificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: xNotificationType
    },
    detailes: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },

  },
  {
    timestamps: true
  }
);

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
