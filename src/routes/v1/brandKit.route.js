const express = require('express');
// const { isAuth } = require('../../middlewares/testAuth');
const { brandKitController } = require('../../controllers');
const { brandUpload, handleMulterError } = require('../../config/multer');
const { isAuth } = require('../../middlewares/testAuth');

const router = express.Router();


// s3 details for multerS3

//multer------------------------------------------------------------

const { S3Client } = require("@aws-sdk/client-s3");

const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new S3Client({
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: process.env.AWS_REGION,
  },
});

const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKETNAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  }),
});

// isAuth - middleware is required here

router.post('/', isAuth, brandUpload.any(), handleMulterError, brandKitController.createBrandKit);
router.get('/', brandKitController.getAllBrandKits);
router.get('/:id', brandKitController.getBrandKitInfo);
router.patch('/:id', brandKitController.updateBrandKit);
router.delete('/:id', brandKitController.deleteBrandKit);

module.exports = router;
