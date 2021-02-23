const mongoose = require('mongoose');

//create schema
const subjectSchema = new mongoose.Schema({
  slug: {type: String, required: true, unique: true},
  ID: {type: String, required: true},
  title:{
    type: String,
    required: true,
    trim: true,
    min: 1,
    max:12
  },
  level:{ type: Number, required: true },
  timePeriod: {type: [{startPeriod: Number, endPeriod: Number}]},
  teachers: {
    type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Teachers'}],
    trim: true,
    min: 3,
    max: 20
  },
  approval: { type: Boolean, default: false},
  description: { type: String},
  students: {
    type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Students'}],
    trim: true,
    min: 3,
    max: 20
  },
  createdBy:[{type: mongoose.Schema.Types.ObjectId, ref: 'Users', required:true}],
  updatedBy:[{type: mongoose.Schema.Types.ObjectId, ref: 'Users', required:true}]
}, {timestampts: true})

module.exports = mongoose.model('Subjects', subjectSchema);