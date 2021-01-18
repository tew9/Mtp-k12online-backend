const mongoose = require('mongoose');

//create schema
const contactSchema = new mongoose.Schema({
  ID: {type: String, required: true, unique: true},
  cellPhone:{
    type: String,
    trim: true,
    min: 10,
    max:15
  },
  email:{
    type: String,
    required: true,
    trim: true,
    min: 1,
    max:30
  },
  homePhone: {
    type: string,
    trim: true,
    minlength: 10,
    maxlength: 15
  },
  
  type: {
    type: ["Guardian", "Self"],
    trim: true,
    minlength: 3,
    required:true,
    default: "Self"
  },
  createdBy:[{type: mongoose.Schema.Types.ObjectId, ref: 'Users', required:true}]
}, {timestampts: true})

module.exports = mongoose.model('Contacts', contactSchema);