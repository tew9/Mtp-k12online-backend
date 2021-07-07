const mongoose = require('mongoose');

//create schema
const classSchema = new mongoose.Schema({
  slug: {type: String, required:true, unique:true},
  ID: {type: String, required: true},
  title:{
    type: String,
    required: true,
    trim: true,
    min: 3,
    max:30
  },
  subjects:{
    type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Subjects'}],
    required: true,
    trim: true,
    min: 3,
    max: 20
  },
  description: {
    type: String,
    trim: true,
    minlength: 3,
  },
  capacity: {
    type: Number,
    trim: true,
    required: true
  },
  facilities: {
    type: [],
    trim: true,
  }, 
  begins: Date,
  ends: Date,
  createdBy:[{type: mongoose.Schema.Types.ObjectId, ref: 'Users', required:true}],
  updatedBy:[{type: mongoose.Schema.Types.ObjectId, ref: 'Users', required:true}]
}, {timestampts: true})

classSchema.virtual('name')
.get(function(){
  return `${this.name.toString()}th $grade`;
});

module.exports = mongoose.model('Classes', classSchema);