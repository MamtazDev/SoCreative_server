const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
  {
    fileData: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File',
      required: true,
    },
  },
  { _id: false }
);

const folderSchema = new mongoose.Schema(
  {
    parentFolderId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    files: {
      type: [fileSchema],
      required: false,
    },
    folderSize: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Folder = mongoose.model('Folder', folderSchema);

module.exports = Folder;
