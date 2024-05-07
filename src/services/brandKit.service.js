const BrandKit = require('../models/brandKit.model');

const createBrandKit = async (body) => {
  const result = await BrandKit.create(body);
  return result;
};

const getAllBrandKits = async () => {
  const result = await BrandKit.find({});

  return result;
};

const getAllBrandKitsByUserId = async (userId) => {
  const result = await BrandKit.find({ creator: userId }).sort({ _id: -1 });
  return result;
};

const getBrandKitInfo = async (id) => {
  const result = await BrandKit.findById(id);

  return result;
};

const updateBrandKit = async (id, body) => {
  const result = await BrandKit.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteBrandKit = async (id) => {
  const result = await BrandKit.findByIdAndDelete(id);

  return result;
};

module.exports = {
  createBrandKit,
  getAllBrandKits,
  getBrandKitInfo,
  updateBrandKit,
  deleteBrandKit,
  getAllBrandKitsByUserId,
};
