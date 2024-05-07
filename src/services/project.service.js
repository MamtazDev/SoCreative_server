const File = require('../models/file.model');
const Notification = require('../models/notification.modal');
const Project = require('../models/project.model');
const ProjectComment = require('../models/projectComment.model');
const ProjectReview = require('../models/projectReview.model');

const createProject = async (userId, requestedBody) => {
  const { title, projectId, size, path } = requestedBody;

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

const updateProjectInfo = async (files, userId, requestedBody) => {
  const { projectId, ...rest } = requestedBody;

  if (files?.supportive) {
    const supportiveFiles = files?.supportive?.map((i) => {
      return { file: i.path, fileType: i.mimetype, size: Number(i.size), name: i.originalname };
    });
    rest['supportiveMaterials'] = supportiveFiles;
  }

  if (rest?.submitVideo) {
    const newFile = new File({
      parentFolderId: projectId,
      title: rest?.title,
      user: userId,
      file: rest?.path,
      fileSize: rest?.size,
    });
    const files = await newFile.save();
    const project = await Project.findById(projectId);
    project.exportedUrl = files._id;
    project.previousVersion.push({
      fileData: files._id,
    });
    const updatedProject = await project.save();
    return updatedProject;
  }
  const updateProject = await Project.findByIdAndUpdate(projectId, rest, { new: true });
  return updateProject;
};

const getProjectInfo = async (projectId) => {
  const project = await Project.findById(projectId)
    .populate({ path: 'exportedUrl' })
    .populate([
      {
        path: 'files',
        populate: {
          path: 'fileData',
        },
      },
    ]);
  return project;
};

const getProjectDetails = async (projectId) => {
  const project = await Project.findById(projectId)
    .populate({ path: 'exportedUrl' })
    .populate([
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
  const comments =
    (await ProjectComment.findOne({ project: projectId }).populate([
      {
        path: 'comments',
        populate: {
          path: 'user',
          select: '-password',
        },
      },
    ])) || {};

  return comments;
};

const getAllProjectsInfo = async (query) => {
  if (query.editor === 'none') {
    query.editor = { $exists: false };
  }
  const projects = await Project.find(query)
    .populate({ path: 'creator', select: '-password' })
    .populate({ path: 'editor', select: '-password' })
    .populate({ path: 'exportedUrl' })
    .populate({ path: 'brandKit' })
    .populate([
      {
        path: 'files',
        populate: {
          path: 'fileData',
        },
      },
    ])
    .populate([
      {
        path: 'previousVersion',
        populate: {
          path: 'fileData',
        },
      },
    ])
    .sort({ createdAt: -1 });
  return projects;
};

const addProjectReview = async (userId, requestBody) => {
  const newProjectReview = new ProjectReview({ user: userId, ...requestBody });
  const projectReview = await newProjectReview.save();
  return projectReview;
};

const getAllReviewsInfo = async () => {
  const reviews = await ProjectReview.find()
    .populate({ path: 'user', select: '-password' })
    .populate({ path: 'project', select: '-password' })
    .sort({ createdAt: -1 });
  return reviews;
};

module.exports = {
  createProject,
  getProjectInfo,
  getUserAllProjects,
  updateProjectInfo,
  getProjectComments,
  addComments,
  getAllProjectsInfo,
  addProjectReview,
  getAllReviewsInfo,
  getProjectDetails,
};
