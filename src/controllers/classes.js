const ClassModel =  require('../models/classes');
const slugify = require('slugify');
const ID = require("nodejs-unique-numeric-id-generator")

/**
* @author
* @function Class-Controller
**/

exports.updateClass = (req, res) => {
  if(!req.params._id){
    return res.status(400).json("Please specify the correct class ID, and add it to params, or contact admin/IT")
  }

  var id = req.params._id;
  const { begins, ends, subjects, description,
          capacity, facilities
  } = req.body;
  var beginsOn = null;
  var endsOn = null
  if(begins != null && ends != null){
    beginsOn =  new Date(begins)
    endsOn = new Date(ends)
  }
  var updateObject = {};
  subjects != null? updateObject.subjects = subjects: updateObject
  begins != null? updateObject.begins = beginsOn: updateObject
  ends != null? updateObject.ends = endsOn: updateObject
  description != null? updateObject.description = description: updateObject
  capacity != null? updateObject.capacity = capacity: updateObject
  facilities != null? updateObject.facilities = facilities: updateObject
  updateObject.updatedBy = req.user;
 
  ClassModel.findOneAndUpdate({ID: id}, updateObject, {new: true}, function(err, response) {
    if(response != null) res.status(204).json({"Update": "updated succesfuly"});
    else res.status(400).json({error: "There's no class with specified ID, please enter the correct ID and try again."})
  });  
}

exports.registerClass = (req, res) => {
  const {title, subjects, capacity, facilities, begins, ends, description } = req.body;
  var beginsOn = null
  var endsOn = null
  if(begins != null && ends != null){
    beginsOn = new Date(begins);
    endsOn = new Date(ends)
  }
  var createdBy = req.user;
  var slug = slugify(`${title}${capacity}`, '_');
  var classId = ID.generate(new Date().toJSON());
  let classImageUrl
  const classObject = {
    ID: classId,
    title,
    description,
    createdBy,
    subjects,
    capacity,
    facilities,
    begins: beginsOn,
    ends: endsOn,
    slug: slug,
    classImage: classImageUrl
  }

  if(req.file){
    classObject.classImage = process.env.API+'/public/'+req.file.filename
  }

  ClassModel.findOne({slug: slug})
  .exec((err, cl) => {
    if(!cl){
      const Class = new ClassModel(classObject);
      Class.save((error, classs)=>{
        error? res.status(400).json({error: error})
        : res.status(201).json({ classs })
      });
    }else{
      res.status(409).json({"error": "This class is already registered, check the inputs and try again."})
    }
  });
}

exports.fetchClasses = (req, res) => {
  ClassModel.find({})
  .exec((error, classes) => {
    if(classes){
      res.status(200).json({classes})
    }
    else {
      res.status(400).json({error})
    }
  });
}

exports.fetchClass = (req, res) => {
  if(req.params.title !== undefined)
  {
    ClassModel.find({title: req.params.title})
    .exec((error, classes) => {
      if(classes){
        res.status(200).json({classes})
      }
      else {
        res.status(400).json({error})
      }
    });
  }
  else{
      res.status(400).json("Bad Requests, Pleas, provide correct class title");
  }
}

exports.deleteClass = (req, res) => {
  if(!req.params._id){
    return res.status(400).json("Please specify the correct class ID, and add it to params or contact admins/IT.")
  }
  ClassModel.findOneAndDelete({ID: req.params._id})
  .exec((error, response) => {
    if(response) {
      res.status(200).json({response: response, deleted:"true"})
    }
    else {
      res.status(400).json(`Bad request, No class exist with that ID! error`)
    }
  });
}
