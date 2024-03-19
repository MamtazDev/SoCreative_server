const File = require('../models/file.model');
const Project = require('../models/project.model');
const ProjectComment = require('../models/projectComment.model');

const createProject = async (userId, file, requestedBody) => {
  const { title, projectId } = requestedBody;
  const { path, size } = file;

  let project = await Project.findById(projectId);

  if (!project) {
    project = new Project({ creator: userId });
  }

  const newFile = new File({
    parentFolderId: project?._id,
    title: title,
    user: userId,
    file: path,
    fileSize: size,
  });

  const files = await newFile.save();

  project.files.push({
    fileData: files._id,
  });

  const updatedProject = await project.save();

  return updatedProject;
};

const updateProjectInfo = async (files, requestedBody) => {
  const { projectId, ...rest } = requestedBody;

  if (files?.supportive) {
    const supportiveFiles = files?.supportive?.map((i) => {
      return { file: i.path, fileType: i.mimetype, size: Number(i.size), name: i.originalname };
    });
    rest['supportiveMaterials'] = supportiveFiles;
  }

  const updateProject = await Project.findByIdAndUpdate(projectId, rest, { new: true });

  return updateProject;
};

const getProjectInfo = async (projectId) => {
  const project = await Project.findById(projectId).populate([
    {
      path: 'files',
      populate: {
        path: 'fileData',
      },
    },
  ]);
  return project;
};

const getUserAllProjects = async (userId, query) => {
  const projects = await Project.find({ creator: userId, ...query })
    .populate([
      {
        path: 'files',
        populate: {
          path: 'fileData',
        },
      },
    ])
    .sort({ createdAt: -1 });
  return projects;
};

const addComments = async (userId, requestedBody) => {
  const { projectId, comment } = requestedBody;

  const newComment = {
    user: userId,
    comment: comment,
  };

  let projectComments = await ProjectComment.findOne({ project: projectId });

  if (!projectComments) {
    projectComments = new ProjectComment({ project: projectId });
  }

  projectComments.comments.push(newComment);

  await projectComments.save();

  return projectComments;
};

const getProjectComments = async (projectId) => {
  const comments = await ProjectComment.findOne({ project: projectId }).populate([
    {
      path: 'comments',
      populate: {
        path: 'user',
      },
    },
  ]);

  return comments;
};

const getAllProjectsInfo = async (query) => {
  const projects = await Project.find({ ...query })
    .populate({ path: 'creator', select: '-password' })
    .populate({ path: 'editor', select: '-password' })
    .sort({ createdAt: -1 });
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
  updateProjectInfo,
  getProjectComments,
  addComments,
  getAllProjectsInfo,
};
