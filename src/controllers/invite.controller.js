const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService, driveService } = require('../services');

const create = catchAsync(async (req, res) => {
  // const user = await userService.createUser(req.body);
  // const tokens = await tokenService.generateAuthTokens(user);
  // const drive = await driveService.createDrive(user);
  res.status(httpStatus.CREATED).send({ data: "Data" });
});

const redeem = catchAsync(async (req, res) => {
  res.status(httpStatus.CREATED).send({ data: "Data" });
});

module.exports = {
  create,
  redeem
};
