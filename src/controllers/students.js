const StudentModel =  require('../models/students');
const ID = require("nodejs-unique-numeric-id-generator")
const slugify = require('slugify');

/**
* @author
* @function Student-Controller
**/

exports.approveStudent = (req, res) => {

  if(!req.params._id){
    return res.status(400).json("Please specify the studentId and add it to params")
  }
  var id = req.params._id
  const { firstName, lastName, middleName, enrolledDate, location, state, level,
          gender, email, cellPhone, city, county, country, zipCode } = req.body;

  var updateObject = {};
  firstName != null? updateObject.firstName = firstName: updateObject
  lastName != null? updateObject.lastName = lastName: updateObject
  middleName != null? updateObject.middleName = middleName: updateObject
  enrolledDate != null? updateObject.enrolledDate = new Date(enrolledDate): updateObject
  location != null? updateObject.location = location: updateObject
  state != null? updateObject.state = state: updateObject
  level != null? updateObject.level = level: updateObject
  gender != null? updateObject.gender = gender: updateObject
  email != null? updateObject.email = email: updateObject
  cellPhone != null? updateObject.cellPhone = cellPhone: updateObject
  city != null? updateObject.city = city: updateObject
  county != null? updateObject.county = county: updateObject
  country != null? updateObject.country = country: updateObject
  zipCode != null? updateObject.zipCode = zipCode: updateObject
  updateObject.approval = true;
  updateObject.updatedBy = req.user;

  StudentModel.findOneAndUpdate({ID: id}, updateObject, {new: true}, function(err, response) {
    if(response != null) res.status(204).json(response);
    else res.status(400).json({err: "We can't find student with given ID, Please provide the correct ID"})
  });  
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
  if(!req.params._id){
    return res.status(400).json("Please specify the correct student ID, and add it to params or contact admins/IT.")
  }
  StudentModel.findOneAndDelete({ID: req.params._id})
  .exec((error, response) => {
    if(response) {
      res.status(200).json({response: response, deleted:"true"})
    }
    else {
      res.status(400).json(`Bad request, No student exist with that ID! error`)
    }
  });
}
