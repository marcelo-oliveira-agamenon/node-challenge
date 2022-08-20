const mongoose = require('mongoose');
const uuid = require('uuid');

const postModel = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v4,
    required: true,
  },
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
  tags: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = mongoose.model('Post', postModel);
