/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { getActivities, createNewActivity } = require('../services/activity.service');

const createActivity = catchAsync(async (req, res) => {
  const result = await createNewActivity(req.body);
  res.status(httpStatus.OK).send({ message: 'Activities Created Successfully', success: true, data: result });
});

const myActivities = catchAsync(async (req, res) => {
  const result = await getActivities(req.user);
  res.status(httpStatus.OK).send({ message: 'Activities Retrieve Successfully', success: true, data: result });
});

module.exports = {
  createActivity,
  myActivities,
};
