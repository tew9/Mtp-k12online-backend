const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const slug = require('slugify')

//create schema
const StudentSchema = new mongoose.Schema({
  ID: {type: String, required: true, unique: true},
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
  approval: { type: Boolean, default: false},
  middleName:{
    type: String,
    trim: true,
    min: 3,
    max: 20
  },
  gender: {
    type: String,
    trim: true,
    min: 3,
    max: 7,
    require: true
  },
  enrolledDate: {
    type: Date,
  },
  dob: {
    type: Date
  },
  email:{
    type: String,
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
  role: {
    type: String,
    default: 'student',
  },
  studentImage: String,
  registeredBy: [{type: mongoose.Schema.Types.ObjectId, ref: 'Users', required:true}],
}, {timestampts: true})

StudentSchema.virtual('fullName')
.get(function(){
  return `${this.firstName} ${this.middleName} ${this.lastName}`;
});

module.exports = mongoose.model('Students', StudentSchema);