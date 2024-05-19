const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { brandKitService } = require('../services');

const createBrandKit = catchAsync(async (req, res) => {
  const data = {
    brandDescription: req.body.brandDescription,
    brandName: req.body.brandName,
    creator: req.user?._id,
    brandGuidelines: [],
    logos: [],
    fonts: [],
    imageAssets: [],
    audioAssets: [],
    colorPalette: [],
  };

  for (let i = 0; i < req.files.length; i++) {
    const element = req.files[i];
    if (element?.fieldname === 'brand[brandGuidelines]') {
      data.brandGuidelines.push(element?.path);
    }
    if (element?.fieldname === 'brand[audioAssets]') {
      data.audioAssets.push(element?.path);
    }
    if (element?.fieldname === 'brand[imageAssets]') {
      data.imageAssets.push(element?.path);
    }
    if (element?.fieldname === 'brand[fonts]') {
      data.fonts.push(element?.path);
    }
    if (element?.fieldname === 'brand[logos]') {
      data.logos.push(element?.path);
    }
    if (element?.fieldname === 'brandLogo') {
      data.brandLogo = element?.path;
    }
  }

  if (req.body.brand?.colorPalette?.length > 0) {
    for (let i = 0; i < req.body.brand?.colorPalette.length; i++) {
      data.colorPalette.push(req.body.brand?.colorPalette[i]);
    }
  }

  const result = await brandKitService.createBrandKit(data);
  res.status(httpStatus.OK).send({ message: 'Brand Kit created successfully!', success: true, data: result });
});

const getAllBrandKits = catchAsync(async (req, res) => {
  const result = await brandKitService.getAllBrandKits();

  res.status(httpStatus.OK).send({ message: 'Brand Kit fetched successfully!', success: true, data: result });
});

const getAllBrandKitsByUser = catchAsync(async (req, res) => {
  const result = await brandKitService.getAllBrandKitsByUserId(req.user?._id);

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
  getAllBrandKitsByUser,
};
