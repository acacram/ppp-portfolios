// models/User.js
const mongoose = require('mongoose');
 
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    default: 'user', // pq no va a ser admin
    required: true,
  }
});
 
module.exports = mongoose.model('User', userSchema);