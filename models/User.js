const mongooes = require('mongoose');

const userSchema = new mongooes.Schema({
  firstName: {
    type: String,
    trim: true,
    default: '',
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    default: '',
    required: true,
  },
  password: {
    required: true,
    trim: true,
    type: String,
  },
  userName: {
    type: String,
    trim: true,
    default: '',
    required: true,
    unique: true,
  },
});

const User = mongooes.model('User', userSchema);

module.exports = User;
