const mongoose = require('mongoose');

const brandKitSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    }, 

    brandLogo: {
      type: String,
      required: true,
    },
    brandName: {
      type: String,
      required: true,
    },
    brandDescription: {
      type: String,
      required: true,
    },
    
    //brand assets
    brandGuidelines: [{
      type: String,
      required: true,
    }], 
    logos: [{
      type: String,
      required: false,
      default: [],
    }],
    fonts: [{
      type: String,
      required: false,
      default: [],
    }],
    colorPalette: [{
      type: String,
      required: false,
      default: [],
    }],
    imageAssets: [{
      type: String,
      required: false,
      default: [],
    }],
    videoAssets: [{
      type: String,
      required: false,
      default: [],
    }],
    audioAssets: [{
      type: String,
      required: false,
      default: [],
    }],
  },
  {
    timestamps: true,
  }
);

const BrandKit = mongoose.model('BrandKit', brandKitSchema);

module.exports = BrandKit;
