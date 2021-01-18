const studentModel =  require('../models/students');
const slugify = require('slugify');

/**
* @author
* @function Student-Controller
**/

exports.approveStudent = (req, res) => {
  const {approval} = req.body;
  var query = { approval: false};
  if(approval){
    var newValue = { $set: { approval: true } }
    console.log(newValue)
    studentModel.updateOne(query, newValue, function(err, response){
      if(!response.result) res.status(500).json({"Update failed!!! ": err});
      if(response.result) res.status(200).json(response.result.nModified)
    });
  }
}

exports.registerClass = (req, res) => {
  const {title, subjects, capacity, facilities, begins, ends } = req.body;
  let studentImageUrl
  const studentObject = {
    title,
    subjects,
    capacity,
    facilities,
    begins,
    phoneNumber,
    slug: slugify(`${firstName} ${middleName} ${lastName}`),
    studentImage: studentImageUrl
  }

  if(req.file){
    studentObject.studentImage = process.env.API+'/public/'+req.file.filename
  }

  const student = new studentModel(studentObject);
  student.save((error, students)=>{
    error? res.status(400).json({error: error})
    : res.status(201).json({ students })
  });
}

exports.fetchStudents = (req, res) => {
  studentModel.find({})
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
  if(req.params.fullName !== undefined){
    studentModel.find({slug: req.params.fullName.replace(/ /g,"-")})
    .exec((error, students) => {
      if(students){
        res.status(200).json({students})
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
  studentModel.findOne({_id: req.params._id})
  .exec((err, student) => {
    if(student){
      studentModel.deleteOne({_id: student._id})
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
