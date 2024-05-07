/* eslint-disable dot-notation */
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { projectService } = require('../services');
const Notification = require('../models/notification.modal');
const Project = require('../models/project.model');
const { createNewActivity } = require('../services/activity.service');

const addProject = catchAsync(async (req, res) => {
  const project = await projectService.createProject(req.user._id, req.body);
  res.status(httpStatus.CREATED).send({ message: 'Project created successfully!', success: true, data: project });
});

const updateProject = catchAsync(async (req, res) => {
  const result = await projectService.updateProjectInfo(req.files, req.user._id, req.body);

  if (!req.body.status) {
    req.body['status'] = 'Draft';
  }

  const project = await Project.findById(req.body.projectId);
  const notificationData = { type: '', detailes: '', user: project?.creator };
  if (req.body?.status === 'accepted') {
    notificationData['type'] = 'Project Accepted';
    notificationData['detailes'] = 'Congratulations! Your Project is Accepted';
  } else if (req.body?.status === 'Exported') {
    notificationData['type'] = 'Exported Project';
    notificationData['detailes'] = 'Project is Exported';
  } else if (req.body?.status === 'Draft') {
    notificationData['type'] = 'Event Alert';
    notificationData['detailes'] = 'Project is Drafted';
  } else if (req.body?.status === 'In Progress') {
    notificationData['type'] = 'Event Alert';
    notificationData['detailes'] = 'Project is In Progress';
  } else if (req.body?.status === 'Decline') {
    notificationData['type'] = 'Project Rejection';
    notificationData['detailes'] = 'Project is Rejected';
  }

  if (notificationData?.type) {
    await Notification.create(notificationData);
  }
  await createNewActivity(req.user, { status: req.body?.status });
  // const result = await  notificationService.createNotification(req.body)
  res.status(httpStatus.CREATED).send({ message: 'Project updated successfully!', success: true, data: result });
});
const getProjectDetails = catchAsync(async (req, res) => {
  const project = await projectService.getProjectDetails(req.params.id);
  if (!project) {
    throw new Error('Project not found');
  }
  res.status(httpStatus.CREATED).send(project);
});

const projectByOwner = catchAsync(async (req, res) => {
  const project = await projectService.getProjectInfo(req.params.id);
  if (!project) {
    throw new Error('Project not found');
  }
  res.status(httpStatus.CREATED).send(project);
});

const getUserProjects = catchAsync(async (req, res) => {
  const project = await projectService.getUserAllProjects(req.user._id, req.query);
  if (!project) {
    throw new Error('Project not found');
  }
  res.status(httpStatus.CREATED).send(project);
});

const addCommentOnProject = catchAsync(async (req, res) => {
  const comments = await projectService.addComments(req.user._id, req.body);
  res.status(httpStatus.CREATED).send({ message: 'Comments added successfully!', success: true, data: comments });
});

const getProjectComments = catchAsync(async (req, res) => {
  const comments = await projectService.getProjectComments(req.params.projectId);
  // if (!comments) {
  //   throw new Error('Comments not found');
  // }
  res.status(httpStatus.CREATED).send(comments);
});

const getAllProjects = catchAsync(async (req, res) => {
  const project = await projectService.getAllProjectsInfo(req.query);
  if (!project) {
    throw new Error('Project not found');
  }
  res.status(httpStatus.CREATED).send(project);
});

const addProjectReview = catchAsync(async (req, res) => {
  const review = await projectService.addProjectReview(req.user._id, req.body);
  res.status(httpStatus.CREATED).send({ message: 'Review added successfully!', success: true, data: review });
});

const getAllReviews = catchAsync(async (req, res) => {
  const reviews = await projectService.getAllProjectsInfo();
  res.status(httpStatus.CREATED).send(reviews);
});

module.exports = {
  addProject,
  updateProject,
  getProjectDetails,
  getUserProjects,
  addCommentOnProject,
  getProjectComments,
  getAllProjects,
  addProjectReview,
  getAllReviews,
  projectByOwner,
};
