// models/Card.js
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({

  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
  },
  date: {
    type: Date,
    default: Date.now 
  },

  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]

});

module.exports = mongoose.model('Card', cardSchema);
