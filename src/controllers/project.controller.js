const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { projectService } = require('../services');

const addProject = catchAsync(async (req, res) => {
  const project = await projectService.createProject(req.user._id, req.file, req.body);
  res.status(httpStatus.CREATED).send({ message: 'Project created successfully!', success: true, data: project });
});

const updateProject = catchAsync(async (req, res) => {
  const project = await projectService.updateProjectInfo(req.user._id, req.files, req.body);
  res.status(httpStatus.CREATED).send({ message: 'Project updated successfully!', success: true, data: project });
});

const getProjectDetails = catchAsync(async (req, res) => {
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

const init = (req, res) => {
  res.send('Api is working fine!');
};

module.exports = {
  addProject,
  updateProject,
  getProjectDetails,
  getUserProjects,
  init,
};
