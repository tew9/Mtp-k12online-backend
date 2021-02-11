const courseModel =  require('../models/courses');
const ID = require("nodejs-unique-numeric-id-generator")
const slugify = require('slugify');

/**
* @author
* @function Course-Controller
**/

exports.approveCourse = (req, res) => {
  const {approval} = req.body;
  var query = { approval: false };
  if(approval){
    var newValue = { $set: { approval: true } }
    console.log(newValue)
    studentModel.updateOne(query, newValue, function(err, response){
      if(!response.result) res.status(500).json({"Update failed!!! ": err});
      if(response.result) res.status(200).json(response.result.nModified)
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
