const express = require('express');

const { isAuth } = require('../../middlewares/testAuth');
const { projectUpload } = require('../../config/multer');
const { projectController } = require('../../controllers');

const router = express.Router();

router.post(
  '/add',
  isAuth,
  projectUpload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'supportive', maxCount: 5 },
  ]),
  projectController.addProject
);
router.get('/userProjects', isAuth, projectController.getUserProjects);
router.get('/:id', isAuth, projectController.getProjectDetails);

router.get('/init', projectController.init);

module.exports = router;
