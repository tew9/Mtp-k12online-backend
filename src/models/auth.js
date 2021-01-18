const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var salt = 10;
//create schema
const userSchema = new mongoose.Schema({
  firstName:{
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 20
  },
  lastName:{
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 20
  },
  userName:{
    type: String,
    required: true,
    trim: true,
    min: 5,
    max: 20,
    unique: true,
    index: true,
    lowercase: true
  },
  email:{
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  hash_password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'coordinator'],
    default: 'student',
  },
  cantactNumber: String,
  profilePicture: String
}, {timestampts: true})

userSchema.virtual('fullName')
.get(function(){
  return `${this.firstName} ${this.lastName}`;
});

userSchema.methods = {
  authenticate: async function(password){
     return await bcrypt.compare(password, this.hash_password);
    }
}

module.exports = mongoose.model('Users', userSchema);