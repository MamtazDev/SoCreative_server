const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { driveService } = require('../services');

const addFolder = catchAsync(async (req, res) => {
  const folder = await driveService.createFolder(req.user._id, req.body);
  res.status(httpStatus.CREATED).send({ message: 'Folder created successfully!', success: true, data: folder });
});

const addFile = catchAsync(async (req, res) => {
  // const folder = await driveService.addFile('65ec205f5b1b6a1fd87bb138', req.file, req.body);

  const folder = await driveService.addFile(req.user._id, req.body);
  res.status(httpStatus.CREATED).send({ success: true, message: 'File added successfully!', data: folder });
});

const getUserDrive = catchAsync(async (req, res) => {
  const drive = await driveService.getUserDriveInfo(req.user._id);
  if (!drive) {
    throw new Error('Drive not found');
  }
  res.status(httpStatus.CREATED).send(drive);
});

const getFolderFiles = catchAsync(async (req, res) => {
  const files = await driveService.getFolderAllFiles(req.params.id);
  res.status(httpStatus.CREATED).send(files);
});

const getUserAllFiles = catchAsync(async (req, res) => {
  const files = await driveService.getUserAllFilesData(req.user._id);
  res.status(httpStatus.CREATED).send(files);
});

const updateFolder = catchAsync(async (req, res) => {
  const files = await driveService.renameFolder(req.params.id, req.body);
  res.status(httpStatus.CREATED).send(files);
});

const removeFolder = catchAsync(async (req, res) => {
  const folder = await driveService.deleteFolder(req.params.id);
  res.status(httpStatus.CREATED).send(folder);
});

const removeFile = catchAsync(async (req, res) => {
  const file = await driveService.deleteFile(req.body);
  res.status(httpStatus.CREATED).send(file);
});

const init = (req, res) => {
  res.send('Api is working fine!');
};

module.exports = {
  addFolder,
  addFile,
  getUserDrive,
  getFolderFiles,
  getUserAllFiles,
  updateFolder,
  updateFolder,
  removeFolder,
  removeFile,
  init,
};
