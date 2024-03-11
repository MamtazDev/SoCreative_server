const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema(
  {
    folderData: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Folder',
      required: true,
    },
  },
  { _id: false }
);

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

const driveSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    folders: {
      type: [folderSchema],
      required: false,
      default: [],
    },
    files: {
      type: [fileSchema],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Drive = mongoose.model('Drive', driveSchema);

module.exports = Drive;
