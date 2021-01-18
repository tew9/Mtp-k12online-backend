const mongoose = require('mongoose');

//create schema
const addressSchema = new mongoose.Schema({
  slug: {type: String, required: true, unique: true},
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
  Description: {
    type: string,
    trim: true,
    minlength: 3,
  },
  country: {
    require: true,
    type: string,
    trim: true,
    minlength: 3,
  },
  location: {
    type: string,
    trim: true,
    minlength: 3,
  },
  state: {
    require: true,
    type: string,
    trim: true,
    minlength: 2,
  },
  zipCode: {
    type: string,
    trim: true,
    minlength: 3,
  },
  createdBy:[{type: mongoose.Schema.Types.ObjectId, ref: 'Users', required:true}]
}, {timestampts: true})

module.exports = mongoose.model('Addresses', addressSchema);