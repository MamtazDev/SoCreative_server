const express = require('express');

const { isAuth } = require('../../middlewares/testAuth');
const { projectUpload, upload } = require('../../config/multer');
const { projectController } = require('../../controllers');

const router = express.Router();

router.post('/add', isAuth, upload.single('video'), projectController.addProject);
router.patch(
  '/update',
  isAuth,
  projectUpload.fields([{ name: 'supportive', maxCount: 5 }]),
  projectController.updateProject
);
router.get('/userProjects', isAuth, projectController.getUserProjects);
router.get('/:id', isAuth, projectController.getProjectDetails);

module.exports = router;
