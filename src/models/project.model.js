const mongoose = require('mongoose');

const supportMetarialSchema = new mongoose.Schema(
  {
    file: String,
    fileType: String,
    size: Number,
    name: String,
  },
  { _id: false }
);
const addOnsSchema = new mongoose.Schema({ name: String, description: String, credit: Number }, { _id: false });

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

const projectSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },

    files: {
      type: [fileSchema],
      required: false,
      default: [],
    },
    // file: {
    //   type: String,
    //   required: true,
    // },
    projectTitle: {
      type: String,
      required: false,
      default: '',
    },
    videoType: {
      type: String,
      required: false,
      default: '',
    },
    videoDuration: {
      type: String,
      required: false,
      default: '',
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
    supportiveMaterials: {
      type: [supportMetarialSchema],
      required: false,
      default: [],
    },
    // brandKit: {
    //   type: mongoose.SchemaTypes.ObjectId,
    //   ref: 'BrandKit',
    //   required: false,
    //   default: null,
    // },
    brandKit: {
      type: String,
      required: false,
      default: '',
    },
    aspectRatio: {
      type: String,
      required: false,
      default: '',
    },
    presenter: {
      type: String,
      required: false,
      default: '',
    },
    addOns: {
      type: [addOnsSchema],
      required: false,
      default: [],
    },
    totalCredit: {
      type: Number,
      required: false,
      default: 0,
    },

    editor: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: false,
    },
    exportedUrl: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false,
      default: 'Draft',
      enum: ['Draft', 'Pending', 'In Progress', 'Exported'],
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
