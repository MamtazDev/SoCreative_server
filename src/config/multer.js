const multer = require('multer');
const fs = require('fs');
const path = require('path');

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

// robiul

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

module.exports = {
  upload,
  projectUpload,
  brandUpload,
  handleMulterError,
};
