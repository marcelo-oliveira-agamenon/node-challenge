const mongoose = require('mongoose');

const postModel = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 250,
    minlength: 8,
  },
  body: {
    type: String,
    required: true,
    maxlength: 250,
    minlength: 8,
  },
});

module.exports = mongoose.model('Post', postModel);
