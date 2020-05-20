const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      lowercase: true,
    },
    albumId: {
      type: String,
      trim: true,
    },
    singer: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;
