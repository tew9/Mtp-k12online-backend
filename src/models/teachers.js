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
  approval: { type: Boolean, default: false},
  role: {
    type: String,
    default: 'teacher',
  },

  gender: {
    type: String,
    trim: true,
    min: 3,
    max: 7,
    require: true
  },
  dob: {
    type: Date,
    required: true,
    trim: true
  },
  email:{
    type: String,
    required: true,
    trim: true,
    min: 1,
    max:30
  },
  cellPhone:{
    type: String,
    trim: true,
    unique: true,
    min: 10,
    max:15
  },
  city:{
    type: String,
    required: true,
    trim: true,
    min: 1,
    max:30
  },
  county:{
    type: String,
    required: true,
    trim: true,
    min: 1,
    max:30
  },
  country: {
    type: String,
    trim: true,
    minlength: 3,
    default: "Ethiopia"
  },
  location: {
    type: String,
    trim: true,
    minlength: 3,
  },
  state: {
    require: true,
    type: String,
    trim: true,
    minlength: 2,
  },
  zipCode: {
    type: String,
    trim: true,
    minlength: 3,
  },
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