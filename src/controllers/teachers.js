const TeacherModel =  require('../models/teachers');
const slugify = require('slugify');

/**
* @author
* @function Teacher-Controller
**/

exports.registerTeacher = (req, res) => {
  const {firstName, lastName, middleName, occupation, gender, email, cellPhone,
         county, country, state, city, zipCode,   } = req.body;

  var { dob }  = req.body;
  dob = new Date(dob);
  const ID = slugify(`${firstName}${lastName}${dob}`)
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
    slug: ID,
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
            error? res.status(400).json({error: error})
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
  if(req.params.fullName !== undefined){
    TeacherModel.find({slug: req.params.fullName.replace(/ /g,"-")})
    .exec((error, teachers) => {
      if(teachers){
        res.status(200).json({teachers})
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

exports.deleteTeacher = (req, res) => {
  TeacherModel.findOne({_id: req.params._id})
  .exec((err, teacher) => {
    if(teacher){
      TeacherModel.deleteOne({_id: teacher._id})
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
        res.status(400).json(`Bad request, No teacher exist with that ID! error: ${err}`)
    }
  })
}
