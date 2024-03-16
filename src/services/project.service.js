const Project = require('../models/project.model');

const createProject = async (userId, files, requestedBody) => {
  const { projectId, ...rest } = requestedBody;

  let project = await Project.findById(projectId);

  if (files?.file) {
    rest['file'] = files?.file[0]?.path;
  }
  if (files?.supportive) {
    const supportiveFiles = files?.supportive?.map((i) => {
      return { file: i.path, fileType: i.mimetype, size: Number(i.size), name: i.originalname };
    });
    rest['supportiveMaterials'] = supportiveFiles;
  }

  if (!project) {
    project = new Project({ creator: userId, file: rest.file });
    await project.save();
    return project;
  }

  const updateProject = await Project.findByIdAndUpdate(projectId, rest, { new: true });

  return updateProject;
};

const getProjectInfo = async (projectId) => {
  const project = await Project.findById(projectId);
  return project;
};

const getUserAllProjects = async (userId, query) => {
  const projects = await Project.find({ creator: userId, ...query });
  return projects;
};

// const createFolder = async (userId, requestBody) => {
//   const drive = await Drive.findOne({ user: userId });
//   if (drive) {
//     const newFolder = new Folder({
//       title: requestBody.title,
//       parentFolderId: drive?._id,
//     });

//     const folder = await newFolder.save();

//     drive.folders.push({
//       folderData: folder?._id,
//     });

//     await drive.save();
//   }

//   return drive;
// };

// const addFile = async (userId, file, requestBody) => {
//   const { title, parentFolderId } = requestBody;
//   const { path, size } = file;

//   const drive = parentFolderId ? await Folder.findById(parentFolderId) : await Drive.findOne({ user: userId });

//   if (drive && parentFolderId) {
//     const newFile = new File({
//       parentFolderId: parentFolderId,
//       title: title,
//       user: userId,
//       file: path,
//       fileSize: size,
//     });

//     const file = await newFile.save();

//     drive.folderSize += size;
//     drive.files.push({
//       fileData: file._id,
//     });
//     const updateFolder = await drive.save();

//     return updateFolder;
//   } else if (drive && !parentFolderId) {
//     const newFile = new File({
//       title: title,
//       user: userId,
//       file: path,
//       fileSize: size,
//       parentFolderId: drive?._id,
//     });

//     const file = await newFile.save();

//     drive.files.push({
//       fileData: file._id,
//     });
//     const updateFolder = await drive.save();
//     return updateFolder;
//   } else {
//     throw new Error('folder not found');
//   }
// };

// const getUserDriveInfo = async (userId) => {
//   const drive = await Drive.findOne({
//     user: userId,
//   }).populate([
//     {
//       path: 'folders',
//       populate: {
//         path: 'folderData',
//       },
//     },
//     {
//       path: 'files',
//       populate: {
//         path: 'fileData',
//       },
//     },
//   ]);

//   return drive;
// };

// const getFolderAllFiles = async (folderId) => {
//   const files = await File.find({
//     parentFolderId: folderId,
//   });
//   const folder = await Folder.findById(folderId);
//   if (!files) {
//     throw new Error('Files not found');
//   }
//   return { title: folder.title, files: files };
// };

// const getUserAllFilesData = async (userId) => {
//   const files = await File.find({
//     user: userId,
//   });
//   return files;
// };

// const renameFolder = async (folderId, requestedBody) => {
//   const folder = await Folder.findByIdAndUpdate(folderId, requestedBody, {
//     new: true,
//   });
//   if (!folder) {
//     throw new Error('Folder info update failed');
//   }
//   return {
//     success: true,
//     message: 'Folder Update successfully',
//     data: folder,
//   };
// };

// const deleteFolder = async (folderId) => {
//   const folder = await Folder.findByIdAndDelete(folderId).populate([
//     {
//       path: 'files',
//       populate: {
//         path: 'fileData',
//       },
//     },
//   ]);
//   if (!folder) {
//     throw new Error('Folder delete failed');
//   }

//   const folderFilesIds = folder.file.map((f) => f.fileData._id);
//   await File.deleteMany({ _id: { $in: folderFilesIds } });

//   const folderFilePaths = folder.file.map((f) => f.fileData.file);
//   for (const file of folderFilePaths) {
//     await fs.promises.unlink(file);
//   }
//   return { success: true, message: 'Folder deleted successfully', data: folder };
// };

// const deleteFile = async (requestBody) => {
//   const { fileId, folderId } = requestBody;
//   const deletedFile = await File.findByIdAndDelete(fileId);
//   if (!deletedFile) {
//     throw new Error('File delete failed');
//   }

//   fs.unlink(deletedFile.file);

//   if (folderId) {
//     const folder = await Folder.findById(folderId);
//     const newFiles = folder.files.filter((i) => i._id !== fileId);
//     folder.files = newFiles;
//     await folder.save();
//   }
//   return { success: true, message: 'File deleted successfully', data: deletedFile };
// };

module.exports = {
  createProject,
  getProjectInfo,
  getUserAllProjects,
};
