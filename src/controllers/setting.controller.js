const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { settingService } = require('../services');

const createSetting = catchAsync(async (req, res) => {
  const setting = await settingService.createSetting(req.body, req.params.userId);
  if (!setting) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found'); 
  }
  res.send(setting);
});

const getSetting = catchAsync(async (req, res) => {
  const user = await settingService.createSetting(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateSetting = catchAsync(async (req, res) => {
  const user = await settingService.updateSettingById(req.params.userId, req.body);
  res.send(user);
});


module.exports = {
  getSetting,
  updateSetting,
  createSetting
};
