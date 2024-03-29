const fs = require('fs');
const Drive = require('../models/drive.model');
const File = require('../models/file.model');
const Folder = require('../models/folder.model');

const createDrive = async (user) => {
  if (!user) {
    throw new Error('user not found');
  }
  const newDrive = new Drive({ user: user._id });
  const drive = await newDrive.save();
  return drive;
};

const createFolder = async (userId, requestBody) => {
  const drive = await Drive.findOne({ user: userId });
  if (drive) {
    const newFolder = new Folder({
      title: requestBody.title,
      parentFolderId: drive?._id,
    });

    const folder = await newFolder.save();

    drive.folders.push({
      folderData: folder?._id,
    });

    await drive.save();
  }

  return drive;
};

const addFile = async (userId, requestBody) => {
  const { title, parentFolderId, path, size } = requestBody;

  const drive = parentFolderId ? await Folder.findById(parentFolderId) : await Drive.findOne({ user: userId });

  if (drive && parentFolderId) {
    const newFile = new File({
      parentFolderId: parentFolderId,
      title: title,
      user: userId,
      file: path,
      fileSize: size,
    });

    const file = await newFile.save();

    drive.folderSize += size;
    drive.files.push({
      fileData: file._id,
    });
    const updateFolder = await drive.save();

    return updateFolder;
  } else if (drive && !parentFolderId) {
    const newFile = new File({
      title: title,
      user: userId,
      file: path,
      fileSize: size,
      parentFolderId: drive?._id,
    });

    const file = await newFile.save();

    drive.files.push({
      fileData: file._id,
    });
    const updateFolder = await drive.save();
    return updateFolder;
  } else {
    throw new Error('folder not found');
  }
};

const getUserDriveInfo = async (userId) => {
  const drive = await Drive.findOne({
    user: userId,
  }).populate([
    {
      path: 'folders',
      populate: {
        path: 'folderData',
      },
    },
    {
      path: 'files',
      populate: {
        path: 'fileData',
      },
    },
  ]);

  return drive;
};

const getFolderAllFiles = async (folderId) => {
  const files = await File.find({
    parentFolderId: folderId,
  });
  const folder = await Folder.findById(folderId);
  if (!files) {
    throw new Error('Files not found');
  }
  return { title: folder.title, files: files };
};

const getUserAllFilesData = async (userId) => {
  const files = await File.find({
    user: userId,
  }).sort({ createdAt: -1 });
  return files;
};

const renameFolder = async (folderId, requestedBody) => {
  const folder = await Folder.findByIdAndUpdate(folderId, requestedBody, {
    new: true,
  });
  if (!folder) {
    throw new Error('Folder info update failed');
  }
  return {
    success: true,
    message: 'Folder Update successfully',
    data: folder,
  };
};

const deleteFolder = async (folderId) => {
  const folder = await Folder.findByIdAndDelete(folderId).populate([
    {
      path: 'files',
      populate: {
        path: 'fileData',
      },
    },
  ]);
  if (!folder) {
    throw new Error('Folder delete failed');
  }

  // deleting folder from the drive
  const drive = await Drive.findById(folder.parentFolderId);
  const updatedFolders = drive.folders.filter((f) => f.folderData.toString() !== folderId);
  drive.folders = updatedFolders;
  await drive.save();

  // deleting folder files
  const folderFilesIds = folder.files.map((f) => f.fileData._id);
  await File.deleteMany({ _id: { $in: folderFilesIds } });

  // const folderFilePaths = folder.file.map((f) => f.fileData.file);
  // for (const file of folderFilePaths) {
  //   await fs.promises.unlink(file);
  // }

  return { success: true, message: 'Folder deleted successfully', data: folder };
};

const deleteFile = async (requestBody) => {
  const { fileId, folderId } = requestBody;
  const deletedFile = await File.findByIdAndDelete(fileId);
  if (!deletedFile) {
    throw new Error('File delete failed');
  }

  // fs.unlink(deletedFile.file);

  if (folderId) {
    const folder = await Folder.findById(folderId);
    if (folder) {
      const newFiles = folder.files.filter((i) => i.fileData.toString() !== fileId);
      folder.files = newFiles;
      await folder.save();
    }

    const drive = await Drive.findById(folderId);
    if (drive) {
      const newDriveFiles = drive.files.filter((i) => i.fileData.toString() !== fileId);
      drive.files = newDriveFiles;
      await drive.save();
    }
  }
  return { success: true, message: 'File deleted successfully', data: deletedFile };
};

module.exports = {
  createDrive,
  createFolder,
  addFile,
  getUserDriveInfo,
  getFolderAllFiles,
  getUserAllFilesData,
  renameFolder,
  deleteFile,
  deleteFolder,
};
