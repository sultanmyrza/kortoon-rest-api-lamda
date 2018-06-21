const mongoose = require('mongoose');

const SceneSchema = new mongoose.Schema({
  alt: String,
  src: String,
  srcFromCloudinary: String
});

const EpisodeSchema = new mongoose.Schema({
  title: String,
  url: String,
  episodeIndex: Number,
  scenes: [SceneSchema]
});

const KortoonSchema = new mongoose.Schema({
  title: String,
  summary: String,
  thumbnailUrl: String,
  thumbnailUrlCloudinary: String,
  PhotoUrl: String,
  PhotoUrlCloudinary: String,
  url: String,
  episodes: [EpisodeSchema]
});

module.exports = mongoose.model('Kortoon', KortoonSchema);
