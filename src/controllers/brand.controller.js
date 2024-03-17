const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { brandKitService } = require('../services');

const createBrandKit = catchAsync(async (req, res) => {
  const result = await brandKitService.createBrandKit(req.body);

  res.status(httpStatus.OK).send({ message: 'Brand Kit created successfully!', success: true, data: result });
});

const getAllBrandKits = catchAsync(async (req, res) => {
  const result = await brandKitService.getAllBrandKits();

  res.status(httpStatus.OK).send({ message: 'Brand Kit fetched successfully!', success: true, data: result });
});

const getBrandKitInfo = catchAsync(async (req, res) => {
  const result = await brandKitService.getBrandKitInfo(req.params.id);
  
  if (!result) {
    throw new Error('Brand Kit not found');
  }

  res.status(httpStatus.OK).send({ message: 'Brand Kit fetched successfully!', success: true, data: result });
});

const updateBrandKit = catchAsync(async (req, res) => {
  const result = await brandKitService.updateBrandKit(req.params.id, req.body);

  res.status(httpStatus.OK).send({ message: 'Brand Kit updated successfully!', success: true, data: result });
});

const deleteBrandKit = catchAsync(async (req, res) => {
  const result = await brandKitService.deleteBrandKit(req.params.id);

  res.status(httpStatus.OK).send({ message: 'Brand Kit deleted successfully!', success: true, data: result });
});

module.exports = {
  createBrandKit,
  getBrandKitInfo,
  getAllBrandKits,
  updateBrandKit,
  deleteBrandKit,
};
