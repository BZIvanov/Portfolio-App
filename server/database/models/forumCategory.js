const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  title: String,
  subTitle: String,
  slug: { type: String, unique: true, index: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ForumCategory', schema);
