const StudentModel =  require('../models/students');
const ID = require("nodejs-unique-numeric-id-generator")
const slugify = require('slugify');

/**
* @author
* @function Student-Controller
**/

exports.approveStudent = (req, res) => {
  const {_id} = req.body;
  if(approval){
    var newValue = { approval: true }
    StudentModel.updateOne({_id}, newValue, function(err, response){
      if(response.n >= 1) res.status(204).json({"Update": "updated succesfuly"});
      else res.status(400).json(response.result.nModified)
    });
  }
}

exports.registerStudent = (req, res) => {
  const { firstName, lastName, middleName,
          gender, email, cellPhone, city, county, country, } = req.body;
  var { dob }  = req.body;
  dob = new Date(dob);
  enrolledDate = new Date()
    
  var studentId = ID.generate(new Date().toJSON());
  var slug = slugify(firstName+lastName+dob);
  var studentImageUrl

  const studentObject = {
    slug: slug,
    firstName,
    lastName,
    middleName,
    email,
    gender,
    cellPhone,
    city,
    country,
    county,
    dob,
    ID: studentId,
    studentImage: studentImageUrl
  }

  if(req.file){
    studentObject.studentImage = process.env.API+'/public/'+req.file.filename
  }

  const student = new StudentModel(studentObject);
  StudentModel.findOne({email: req.body.email})
  .exec((error, std) => {
    if(std)
      res.status(409).json({"error": `Student with email ${req.body.email} has already been registered.`})
    else {
      StudentModel.findOne({slug: slug})
      .exec((error, stdnt) => {
        if(stdnt)
          res.status(409).json({"error": `A Student with this name ${req.body.firstName} ${req.body.lastName} already exists`})
        else{
          student.save((error, students)=>{
            error? res.status(400).json({error: error})
            : res.status(201).json({ students })
          });
        }
      })
    }
  });
}
  

exports.fetchStudents = (req, res) => {
  StudentModel.find({})
  .exec((error, students) => {
    if(students){
      res.status(200).json({students})
    }
    else {
      res.status(400).json({error})
    }
  });
}

exports.fetchStudent = (req, res) => {
  if(req.params._id !== undefined){
    StudentModel.find({_id: req.params._id})
    .exec((error, student) => {
      if(student){
        res.status(200).json({student})
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

exports.deleteStudent = (req, res) => {
  StudentModel.findOne({_id: req.params._id})
  .exec((err, student) => {
    if(student){
      StudentModel.deleteOne({_id: student._id})
      .exec((error, response) => {
        if(response) {
          res.status(200).json({response: {"student": student, "deleted":"true"}})
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
