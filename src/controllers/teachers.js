const teacherModel =  require('../models/teachers');
const slugify = require('slugify');

/**
* @author
* @function Teacher-Controller
**/

exports.registerTeacher = (req, res) => {
  const {firstName, lastName, middleName, dob, gender, email, cellPhone,
         county, country, state, city, zipCode,   } = req.body;

  dob = new Date(dob);
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
    county,
    city,
    state,
    slug: slugify(`${firstName}${lastName}${dob}`),
    profilePicture: ImageUrl
  }

  if(req.file){
    teacherObject.teacherImage = process.env.API+'/public/'+req.file.filename
  }

  const teacher = new teacherModel(teacherObject);
  teacher.save((error, teachers)=> {
    error? res.status(400).json({error: error})
    : res.status(201).json({ teachers })
  });
}

exports.fetchTeachers = (req, res) => {
  teacherModel.find({})
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
    teacherModel.find({slug: req.params.fullName.replace(/ /g,"-")})
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
  teacherModel.findOne({_id: req.params._id})
  .exec((err, teacher) => {
    if(teacher){
      teacherModel.deleteOne({_id: teacher._id})
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
