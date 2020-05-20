const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      lowercase: true,
    },
    singers: {
      type: Array,
      default: [],
    },
    tracks: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
