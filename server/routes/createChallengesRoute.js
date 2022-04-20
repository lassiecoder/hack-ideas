const express = require('express');
const mongoose = require('mongoose');

const requireLogin = require('../middleware/requireLogin');
const router = express.Router();

const Challenges = require('../models/challengesModel');
const ChallengesList = mongoose.model('Challenges');

// CHALLENGE LIST
router.route('/challenges-list', requireLogin).get((req, res) => {
  ChallengesList.find()
    .then(challengesList => {
      res.json({ challengesList });
    })
    .catch(error => console.log(error, '-error from challenges list route'));
});

// CREATE CHALLENGE
router.route('/create-challenge').post((req, res) => {
  // const title = req.body.title;
  // const description = req.body.description;
  // const recommendedFor = req.body.recommendedFor;
  const { title, description, recommendedFor, date } = req.body;

  if (!title || !description || !recommendedFor) {
    return res.status(422).json({ error: 'Please fill all the fields' });
  } else {
    const challenge = new Challenges({
      title,
      date,
      description,
      recommendedFor
    });
    const challenges = challenge.save();
    res.send(challenges);
  }
});

module.exports = router;
