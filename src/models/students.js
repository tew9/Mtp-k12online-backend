const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//create schema
const studentSchema = new mongoose.Schema({
  ID: {type: String, required: true, unique: true},
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
  addresses: {type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Addresses', required:true}]},
  contacts: {type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Contacts', required:true}]},
  role: {
    type: String,
    default: 'student',
  },
  studentImage: String,
  registeredBy: [{type: mongoose.Schema.Types.ObjectId, ref: 'Users', required:true}],
}, {timestampts: true})

studentSchema.virtual('fullName')
.get(function(){
  return `${this.firstName} ${this.middleName} ${this.lastName}`;
});

module.exports = mongoose.model('Students', studentSchema);