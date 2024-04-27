const fs = require('fs');
const path = require('path');

const multer = require('multer');

//S3multer------------------------------------------------------------
const { S3Client } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('public')) {
      fs.mkdirSync('public');
    }

    if (!fs.existsSync('public/videos')) {
      fs.mkdirSync('public/videos');
    }

    cb(null, 'public/videos');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);

    if (ext !== '.mkv' && ext !== '.mp4') {
      return cb(new Error('Only videos are allowed!'));
    }

    cb(null, true);
  },
});

const projectStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('public')) {
      fs.mkdirSync('public');
    }

    if (!fs.existsSync('public/videos')) {
      fs.mkdirSync('public/videos');
    }

    cb(null, 'public/videos');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const projectUpload = multer({
  storage: projectStorage,
});



// dihan

const brandAssetsStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = path.join('public', 'uploads');
    fs.mkdirSync(destinationPath, { recursive: true }); // Create directories recursively
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, filename);
  },
});

const brandUpload = multer({
  storage: brandAssetsStorage,
});

const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: 'Multer error: ' + err.message });
  } else if (err) {
    return res.status(500).json({ error: err.message });
  }

  next();
};




// s3 details for multerS3

const s3 = new S3Client({
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: process.env.AWS_REGION,
  },
});

const getFileDirectoryBasedOnMimeType = (file) => {
  let directory;
  switch (file.filetype) {
    case 'application/pdf':
      directory = 'PDF';
      break;
    case 'image/jpeg':
    case 'image/png':
    case 'image/gif':
      directory = 'Images';
      break;
    case 'text/plain':
      directory = 'Text';
      break;
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      directory = 'Documents';
      break;
    case 'audio/mpeg':
    case 'audio/mp3':
    case 'audio/wav':
      directory = 'Audio';
      break;
    case 'video/mp4':
    case 'video/quicktime':
    case 'video/x-msvideo':
      directory = 'Video';
      break;
    case 'application/font-woff':
    case 'application/font-woff2':
    case 'application/vnd.ms-fontobject':
    case 'font/ttf':
      directory = 'Fonts';
      break;
    default:
      directory = 'Other';
      break;
  }
  const uniqueSuffix = Date.now();
  return `assets/${directory}/${uniqueSuffix}-${file.originalname}`;
}



const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKETNAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: `${Date.now()}${path.extname(file.originalname)}`});
      // cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      console.log("file.type", file.mimetype)
      
      cb(null, getFileDirectoryBasedOnMimeType(file) );
    },
  }),
});


module.exports = {
  upload,
  projectUpload,
  brandUpload,
  handleMulterError,
  uploadS3
};
