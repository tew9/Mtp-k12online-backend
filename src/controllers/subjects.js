const SubjectModel =  require('../models/subjects');
const ID = require("nodejs-unique-numeric-id-generator")
const slugify = require('slugify');

/**
* @author
* @function Subject-Controller
**/

exports.updateSubject = (req, res) => {
  if(!req.params._id){
    return res.status(400).json("Please specify the correct subject ID, and add it to params or contact admins/IT.")
  }
  var id = req.params._id;
  const { timePeriod, teachers, students, level, approval } = req.body;
  var updatedBy = req.user;

  var updateObject = {};
  timePeriod != null? updateObject.timePeriod = timePeriod: updateObject
  teachers != null? updateObject.teachers = teachers: updateObject
  students != null? updateObject.students = students: updateObject
  description != null? updateObject.description = description: updateObject
  level != null? updateObject.level = level: updateObject
  approval? updateObject.approval = approval: updateObject
  updateObject.updatedBy = updatedBy;

  SubjectModel.findOneAndUpdate({ID: id}, updateObject, {new: true}, function(err, response) {
    if(response != null) res.status(204).json({"Update": "updated succesfuly"});
    else res.status(400).json({error: "There's no subject with specified ID, please enter the correct ID and try again."})
  }); 
}

exports.registerSubject = (req, res) => {
  const { title, level, timePeriod, teachers, students, description } = req.body;
  var SubjectId = ID.generate(new Date().toJSON());
  var slug = slugify(`${title}_${level}`);
  
  const SubjectObject = {
    title,
    level,
    timePeriod, 
    description,
    teachers, 
    students,
    ID: SubjectId,
    slug: slug,
    createdBy: req.user
  }

  const Subject = new SubjectModel(SubjectObject);
  SubjectModel.findOne({slug: slug})
  .exec((error, subject) => {
    if(subject)
      res.status(409).json({error: `This subject ${slug.split("_")[0]} is already registered for ${slug.split("_")[1]} !!!`})
    else{
      Subject.save((error, Subject)=>{
        error? res.status(400).json({error: error})
        : res.status(201).json({ Subject })
      });
    }
  });
}

exports.fetchSubjects = (req, res) => {
  SubjectModel.find({})
  .populate('students')
  .populate('teachers')
  .exec((error, Subjects) => {
    if(Subjects){
      res.status(200).json({ Subjects })
    }
    else {
      res.status(400).json({ error })
    }
  });
}

exports.fetchSubject = (req, res) => {
  if(req.params.title !== undefined){
    SubjectModel.find({title: req.params.title})
    .populate('students')
    .populate('teachers')
    .exec((error, Subjects) => {
      if(Subjects){
        res.status(200).json({Subjects})
      }
      else {
        res.status(400).json({error})
      }
    });
  }
  else{
    res.status(400).json("Bad Requests, provide your full name")
  }
}

exports.deleteSubject = (req, res) => {
  if(!req.params._id){
    return res.status(400).json("Please specify the correct subject ID, and add it to params or contact admins/IT.")
  }
  SubjectModel.findOneAndDelete({ID: req.params._id})
  .exec((error, response) => {
    if(response) {
      res.status(200).json({response: response, deleted:"true"})
    }
    else {
      res.status(400).json(`Bad request, No subject exist with that ID! error`)
    }
  });
}
