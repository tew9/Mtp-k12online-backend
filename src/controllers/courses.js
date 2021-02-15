const SubjectModel =  require('../models/courses');
const ID = require("nodejs-unique-numeric-id-generator")
const slugify = require('slugify');

/**
* @author
* @function Course-Controller
**/

exports.updateSubject = (req, res) => {
  const { timePeriod, teacher, student, title, level } = req.body;
  var approval = true
  var updatedBy = req.user;
  var slug = slugify(`${title}_${level}th-grade`);
  console.log(timePeriod)

  if(approval){
    var newValue = {approval: true, timePeriod, updatedBy, teacher, student, level}
    SubjectModel.updateOne({slug}, newValue, function(err, response){
     if(response.n >= 1) res.status(200).json({"updated": "true"})
     else{ res.status(400).json({"updated": "failed, the record doesn't exists", "result": response})}
    });
  }
}

exports.registerCourse = (req, res) => {
  const { title, level } = req.body;
  var courseId = ID.generate(new Date().toJSON());
  var slug = slugify(`${title}_${level}`);
  
  const courseObject = {
    title,
    level,
    ID: courseId,
    slug: slug,
    createdBy: req.user
  }

  const course = new courseModel(courseObject);
  courseModel.findOne({slug: slug})
  .exec((error, subject) => {
    if(subject)
      res.status(409).json({error: `This subject ${slug.split("_")[0]} is already registered for ${slug.split("_")[1]} !!!`})
    else{
      course.save((error, course)=>{
        error? res.status(400).json({error: error})
        : res.status(201).json({ course })
      });
    }
  });
}

exports.fetchCourses = (req, res) => {
  courseModel.find({})
  .exec((error, courses) => {
    if(courses){
      res.status(200).json({ courses })
    }
    else {
      res.status(400).json({ error })
    }
  });
}

exports.fetchCourseByTitle = (req, res) => {
  if(req.params.title !== undefined){
    courseModel.find({title: req.params.title})
    .exec((error, courses) => {
      if(courses){
        res.status(200).json({courses})
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

exports.deleteCourse = (req, res) => {
  studentModel.findOne({_id: req.params._id})
  .exec((err, course) => {
    if(course){
      courseModel.deleteOne({_id: student._id})
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
