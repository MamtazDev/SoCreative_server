const express = require('express');
const auth = require('../../middlewares/auth');
const { driveController } = require('../../controllers');
const { upload } = require('../../config/multer');

const router = express.Router();

router.post('/createFolder', auth(), driveController.addFolder);
router.post('/addFile', upload.single('video'), driveController.addFile);
router.patch('/updateFolder/:id', auth(), driveController.updateFolder);
router.get('/getUserDrive', auth(), driveController.getUserDrive);
router.get('/getUserAllFiles', auth(), driveController.getUserAllFiles);
router.get('/getFolderFile/:id', auth(), driveController.getFolderFiles);

router.get('/init', driveController.init);

module.exports = router;
