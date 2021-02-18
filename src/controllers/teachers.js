const TeacherModel =  require('../models/teachers');
const ID = require("nodejs-unique-numeric-id-generator")
const slugify = require('slugify');

/**
* @author
* @function Teacher-Controller
**/

exports.updateTeacher = (req, res) => {
  if(!req.params._id){
    return res.status(400).json("Please specify the teacherId and add it to params")
  }
  var id = req.params._id
  const { firstName, lastName, middleName, occupation, location, state, level,
          gender, email, cellPhone, city, county, country, zipCode } = req.body;

  var updateObject = {};
  firstName != null? updateObject.firstName = firstName: updateObject
  lastName != null? updateObject.lastName = lastName: updateObject
  middleName != null? updateObject.middleName = middleName: updateObject
  occupation != null? updateObject.occupation =occupation: updateObject
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

  TeacherModel.findOneAndUpdate({ID: id}, updateObject, {new: true}, function(err, response) {
    if(response != null) res.status(204).json(response);
    else res.status(400).json({err: "We can't find teacher with given ID, Please provide the correct ID"})
  });  
}

exports.registerTeacher = (req, res) => {
  const {firstName, lastName, middleName, occupation, gender, email, cellPhone,
         county, country, state, city, zipCode,   } = req.body;

  var { dob }  = req.body;
  dob = new Date(dob);
  const slug = slugify(`${firstName}${lastName}${dob}`)
  var teacherId = ID.generate(new Date().toJSON());
  let ImageUrl
  const teacherObject = {
    firstName,
    lastName,
    middleName,
    dob,
    gender,
    cellPhone,
    zipCode,
    email,
    country,
    occupation,
    county,
    city,
    state,
    ID: teacherId,
    slug: slug,
    createdBy: req.user,
    profilePicture: ImageUrl
  }

  if(req.file){
    teacherObject.teacherImage = process.env.API+'/public/'+req.file.filename
  }

  const teacherMod = new TeacherModel(teacherObject);
  TeacherModel.findOne({email: req.body.email})
  .exec((error, teacher) => {
    if(teacher)
      res.status(409).json({"error": `A Teacher with email ${req.body.email} already exists`})
    else{
      TeacherModel.findOne({slug: ID})
      .exec((error, result) => {
        if(result)
          res.status(409).json({"error": `A Teacher with this name ${req.body.firstName} ${req.body.lastName} already exists`})
        else{
          teacherMod.save((error, result)=> {
            error? res.status(400).json({error: 'error happened', error})
            : res.status(201).json({ "teacher":result })
          });
        }
      });
    }
  })
  
}

exports.fetchTeachers = (req, res) => {
  TeacherModel.find({})
  .exec((error, teachers) => {
    if(teachers){
      res.status(200).json({teachers})
    }
    else {
      res.status(400).json({error})
    }
  });
}

exports.fetchTeacher = (req, res) => {
  if(req.params._id !== undefined){
    TeacherModel.find({_id: req.params._id})
    .exec((error, teacher) => {
      if(teacher){
        res.status(200).json({teacher})
      }
      else {
        res.status(400).json({error})
      }
    });
  }
  else{
    res.status(400).json("Bad Requests, please enter teacher's ID.")
  }
  
}

exports.deleteTeacher = (req, res) => {
  if(!req.params._id){
    return res.status(400).json("Please specify the correct teacher ID, and add it to params or contact admins/IT.")
  }
  TeacherModel.findOneAndDelete({ID: req.params._id})
  .exec((error, response) => {
    if(response) {
      res.status(200).json({response: response, deleted:"true"})
    }
    else {
      res.status(400).json(`Bad request, No teacher exist with that ID! error`)
    }
  });
}
