const SubjectModel =  require('../models/subjects');
const ID = require("nodejs-unique-numeric-id-generator")
const slugify = require('slugify');

/**
* @author
* @function Subject-Controller
**/

exports.updateSubject = (req, res) => {
  const { timePeriod, teacher, student, title, level } = req.body;
  var approval = true
  var updatedBy = req.user;
  var slug = slugify(`${title}_${level}th-grade`);
  if(approval){
    var newValue = {approval: true, timePeriod, updatedBy, teacher, student, level}
    SubjectModel.updateOne({slug}, newValue, function(err, response){
     if(response.n >= 1) res.status(204).json({"updated": "true"})
     else{ res.status(400).json({"updated": "failed, the record doesn't exists", "result": response})}
    });
  }
}

exports.registerSubject = (req, res) => {
  const { title, level } = req.body;
  var SubjectId = ID.generate(new Date().toJSON());
  var slug = slugify(`${title}_${level}`);
  
  const SubjectObject = {
    title,
    level,
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
  studentModel.findOne({_id: req.params._id})
  .exec((err, Subject) => {
    if(Subject){
      SubjectModel.deleteOne({_id: student._id})
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
        res.status(400).json(`Bad request, No student exist with that ID! error: ${err}`)
    }
  })
}
