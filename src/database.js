const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Name is required field']
  },
  codingLan: {
    type: String,
    required: [true, 'coding lang is required field']
  },
  stdin: {
    type: String
  },
  code: {
    type: String
  },
});

const codeModel = mongoose.model('CodeStore', codeSchema);

module.exports = codeModel;