const mongoose = require('mongoose');

const FeaturedMediaSchema = new mongoose.Schema({
  petName:   String,
  breed:     String,
  caption:   String,
  files:     [String],     // stored file paths
  featured:  { type: Boolean, default: false },  // admin toggles this
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FeaturedMedia', FeaturedMediaSchema);