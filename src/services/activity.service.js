/* eslint-disable prettier/prettier */
/* eslint-disable dot-notation */
const Activity = require('../models/activity.modal');

const createNewActivity = async (user, data) => {
  const updateData = { user: user?._id, type: '', detailes: '' };
  if (data?.status === 'accepted') {
    updateData['type'] = 'Project Accepted';
    updateData['detailes'] = 'Congratulations! Your Project is Accepted';
  } else if (data?.status === 'Exported') {
    updateData['type'] = 'Exported Project';
    updateData['detailes'] = 'Project is Exported';
  } else if (data?.status === 'Draft') {
    updateData['type'] = 'Event Alert';
    updateData['detailes'] = 'Project is Drafted';
  } else if (data?.status === 'In Progress') {
    updateData['type'] = 'Event Alert';
    updateData['detailes'] = 'Project is In Progress';
  } else if (data?.status === 'Decline') {
    updateData['type'] = 'Project Rejection';
    updateData['detailes'] = 'Project is Rejected';
  }
  const newData = new Activity(updateData);
  const result = await newData.save();
  return result;
};

const getActivities = async (user) => {
  const result = await Activity.find({ user: user?._id }).populate('user', 'role email name').sort({ _id: -1 });
  return result;
};

module.exports = {
  createNewActivity,
  getActivities,
};
