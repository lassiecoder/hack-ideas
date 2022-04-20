const mongoose = require('mongoose');

const challengesSchema = {
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  recommendedFor: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
};

const Challenges = mongoose.model('Challenges', challengesSchema);

module.exports = Challenges;
