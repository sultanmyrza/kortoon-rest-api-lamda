const mongoose = require('mongoose');
const KortoonSchema = new mongoose.Schema({
  title: String,
  description: String
});
module.exports = mongoose.model('Kortoon', KortoonSchema);
