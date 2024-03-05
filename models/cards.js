// models/Card.js
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  image: String,
  title: String,
  text: String,
  date: String
});

module.exports = mongoose.model('Card', cardSchema);
