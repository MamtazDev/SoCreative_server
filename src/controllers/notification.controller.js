const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { notificationService } = require('../services');

const createNotification = catchAsync(async (req, res) => {
  const result = await notificationService.createNotification(req.body);

  res.status(httpStatus.OK).send({ message: 'Notification created successfully!', success: true, data: result });
});

// const getAllBrandKits = catchAsync(async (req, res) => {
//   const result = await brandKitService.getAllBrandKits();

//   res.status(httpStatus.OK).send({ message: 'Brand Kit fetched successfully!', success: true, data: result });
// });

const getAllNotificationById = catchAsync(async (req, res) => {
  const result = await notificationService.getAllNotification(req.params.id);

  if (!result) {
    throw new Error('Notification not found');
  }

  res.status(httpStatus.OK).send({ message: 'Notification fetched successfully!', success: true, data: result });
});

const getMyNotifications = catchAsync(async (req, res) => {
  const result = await notificationService.getAllNotification(
    req.user,
    parseInt(req.query?.currentPage),
    parseInt(req.query?.limit)
  );
  res.status(httpStatus.OK).send({ message: 'Notification fetched successfully!', success: true, data: result });
});

const deleteNotification = catchAsync(async (req, res) => {
  const result = await notificationService.deleteNotification(req.params.id);

  res.status(httpStatus.OK).send({ message: 'Notification deleted successfully!', success: true, data: result });
});

module.exports = {
  createNotification,
  getAllNotificationById,
  deleteNotification,
  getMyNotifications,
};
