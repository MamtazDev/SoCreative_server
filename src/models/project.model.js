const mongoose = require('mongoose');

const supportMetarialSchema = new mongoose.Schema(
  {
    file: String,
    fileType: String,
  },
  { _id: false }
);
const addOnsSchema = new mongoose.Schema({ name: String, description: String, credit: Number }, { _id: false });

const projectSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },

    // files: {
    //   type: [fileSchema],
    //   required: false,
    // },
    file: {
      type: String,
      required: true,
    },
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
    // },
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
    },
    status: {
      type: String,
      required: false,
      default: 'Draft',
      enum: ['Draft', 'Exported'],
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
