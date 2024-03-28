const express = require('express');
const auth = require('../../middlewares/auth');
const { driveController } = require('../../controllers');
const { isAuth } = require('../../middlewares/testAuth');

const router = express.Router();

router.post('/createFolder', isAuth, driveController.addFolder);
router.post('/addFile', isAuth, driveController.addFile);
router.patch('/updateFolder/:id', isAuth, driveController.updateFolder);
router.get('/getUserDrive', isAuth, driveController.getUserDrive);
router.get('/getUserAllFiles', isAuth, driveController.getUserAllFiles);
router.get('/getFolderFile/:id', isAuth, driveController.getFolderFiles);
router.delete('/removeFile', isAuth, driveController.removeFile);
router.delete('/removeFolder/:id', isAuth, driveController.removeFolder);

router.get('/init', driveController.init);

module.exports = router;
