const ClassModel =  require('../models/classes');
const slugify = require('slugify');
const ID = require("nodejs-unique-numeric-id-generator")

/**
* @author
* @function Class-Controller
**/

exports.approveClass = (req, res) => {
  const {approval} = req.body;
  var query = { approval: false};
  if(approval){
    var newValue = { $set: { approval: true } }
    console.log(newValue)
    ClassModel.updateOne(query, newValue, function(err, response){
      if(!response.result) res.status(500).json({"Update failed!!! ": err});
      if(response.result) res.status(200).json(response.result.nModified)
    });
  }
}

exports.registerClass = (req, res) => {
  const {title, subjects, capacity, facilities, begins, ends } = req.body;
  var beginsOn = null
  var endsOn = null
  if(begins != null && ends != null){
    beginsOn = new Date(begins);
    endsOn = new Date(ends)
  }
  var slug = slugify(`${title}${capacity}`, '_');
  var classId = ID.generate(new Date().toJSON());
  let classImageUrl
  const classObject = {
    ID: classId,
    title,
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

  const Class = new ClassModel(classObject);
  Class.save((error, classs)=>{
    error? res.status(400).json({error: error})
    : res.status(201).json({ classs })
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
  if(req.params.slug !== undefined)
  {
    ClassModel.find({slug: req.params.slug})
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
      res.status(400).json("Bad Requests, please, provide correct class title");
  }
}

exports.deleteClass = (req, res) => {
  ClassModel.findOne({_id: req.params._id})
  .exec((err, classes) => {
    if(classes){
      ClassModel.deleteOne({_id: classes._id})
      .exec((error, response) => {
        if(response) {
          res.status(200).json({response: {"deleted":"true"}})
        }
        else {
          res.status(400).json({error})
        }
      });
    }
    else{
        res.status(400).json(`Bad request, No class exist with that ID! error: ${err}`)
    }
  })
}
