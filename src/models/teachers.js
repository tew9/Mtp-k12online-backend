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
  dob: {
    type: Date
  },
  gender: {
    type: String,
    required: true,
    trim: true,
    min: 1
  },
  address: {type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Addresses', required:true}]},
  contacts:{type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Contacts', required:true}]},
  occupation: {
    type: String,
    trim: true,
    required: true
  },
  profilePicture: {type: String},
  phoneNumber: String,
}, {timestampts: true})

teacherSchema.virtual('fullName')
.get(function(){
  return `${this.firstName} ${this.middleName} ${this.lastName}`;
});

module.exports = mongoose.model('Teachers', teacherSchema);