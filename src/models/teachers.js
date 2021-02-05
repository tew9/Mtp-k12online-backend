const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//create schema
const teacherSchema = new mongoose.Schema({
  slug: {type: String, required: true, unique: true},
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
  middleName:{
    type: String,
    trim: true,
    min: 3,
    max: 20
  },
  email:{
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  role: {
    type: String,
    default: 'teacher',
  },
  dob: {
    type: Date
  },
  gender: {
    type: String,
    required: true,
    trim: true,
    min: 1
  },
  country: { type: String, required: true, trim: true },
  county: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  cellPhone: { type: String, trim: true },
  occupation: {
    type: String,
    trim: true,
    required: true
  },
  profilePicture: {type: String},
}, {timestampts: true})

teacherSchema.virtual('fullName')
.get(function(){
  return `${this.firstName} ${this.middleName} ${this.lastName}`;
});

module.exports = mongoose.model('Teachers', teacherSchema);