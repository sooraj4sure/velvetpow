const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  contact: {
    name:     { type: String, required: true },
    email:    { type: String, required: true },
    phone:    String,
    city:     String,
    multiple: String,   // "yes" | "no"
  },
  lifestyle: {
    vacation:  String,
    food:      String,
    spend:     String,
    purchases: [String],  // multi-select array
    car:       String,
  },
  personality: {
    phrase:     String,
    doorbell:   String,
    restaurant: String,
    design:     String,
    splurge:    String,
  },
  products: {
    offleash: String,
    guests:   String,
  },
  petCategory: String,   // one of the 10 archetypes
  earlyAccess: String,   // "yes" | "community"
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Submission', SubmissionSchema);