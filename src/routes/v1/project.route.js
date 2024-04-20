const express = require('express');

const { isAuth } = require('../../middlewares/testAuth');
const { projectUpload, upload } = require('../../config/multer');
const { projectController } = require('../../controllers');

const router = express.Router();

router.post('/add', isAuth, projectController.addProject);
router.post('/addComment', isAuth, projectController.addCommentOnProject);
router.post('/addReview', isAuth, projectController.addProjectReview);
router.patch(
  '/update',
  isAuth,
  projectUpload.fields([{ name: 'supportive', maxCount: 5 }]),
  projectController.updateProject
);
router.get('/userProjects', isAuth, projectController.getUserProjects);
router.get('/getAllProjects', isAuth, projectController.getAllProjects);
router.get('/getAllReviews', isAuth, projectController.getAllReviews);
router.get('/:id', isAuth, projectController.getProjectDetails);
router.get('/comment/:projectId', isAuth, projectController.getProjectComments);

router.get('/projectDetailsById', isAuth, projectController.getProjectDetails);

module.exports = router;
