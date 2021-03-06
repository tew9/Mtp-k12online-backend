const mongoose = require('mongoose');

//create schema
const classSchema = new mongoose.Schema({
  ID: {type: String, required: true, unique: true},
  title:{
    type: String,
    required: true,
    trim: true,
    min: 3,
    max:30
  },
  subjects:{
    type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Courses'}],
    required: true,
    trim: true,
    min: 3,
    max: 20
  },
  Description: {
    type: string,
    trim: true,
    minlength: 3,
  },
  capacity: {
    type: Int16Array,
    trim: true,
    required: true
  },
  facilities: {
    type: [],
    trim: true,
  }, 
  begins: Date,
  ends: Date,
  createdBy:[{type: mongoose.Schema.Types.ObjectId, ref: 'Users', required:true}]
}, {timestampts: true})

classSchema.virtual('name')
.get(function(){
  return `${this.name.toString()}th $grade`;
});

module.exports = mongoose.model('Classes', classSchema);