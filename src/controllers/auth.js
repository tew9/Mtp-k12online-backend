const User = require('../models/auth');
const jwt = require('jsonwebtoken');
const bcrpt = require('bcrypt');
const slugify = require('slugify');
const TeacherModel =  require('../models/teachers');
const StudentModel =  require('../models/students');
const salt = 10; 

exports.signup = (req, res) => {
  User.findOne({email: req.body.email})
  .exec(async (error, user) => {
    if(user){
      return res.status(409).json({message: `There's a user already registered with ${req.body.email}, Please signIn or reset your password`})
    }
    else {
      //create an account
      const {firstName, lastName, email, password, role, } = req.body;
      const hash_password = await bcrpt.hash(password, salt);
      var { dob }  = req.body;
      dob = new Date(dob);
      const slug = slugify(firstName+lastName+dob);


      if(role === 'teacher'){
        const _user  = new User({
          slug,
          firstName,
          dob,
          lastName,
          email,
          hash_password,
          userName: `${firstName}${lastName}${req.body.dob.split("-")[2]}`,
          role: 'teacher'
        });
        saveAccount(_user, res, role, slug);
      }

      else if(role === 'director'){
        if(req.body.code !== "CHANG")
          res.status(400).json("You've specified your role as director but haven't provided the correct admin code, please contact site admins for correct code.")
        else{
          const _user  = new User({
            slug,
            firstName,
            lastName,
            email,
            dob,
            hash_password,
            userName: `${firstName}${lastName}${req.body.dob.split("-")[2]}`,
            role: 'director'
          });
          saveAccount(_user, res, role, slug);
        }
      }

     else if(role === 'student'){
        const _user  = new User({
          slug,
          firstName,
          lastName,
          email,
          dob,
          hash_password,
          userName: `${firstName}${lastName}${req.body.dob.split("-")[2]}`,
          role: 'student'
        });
        saveAccount(_user, res, role, slug);
      }
      else{
        res.status(404).json({error: "please specify your role as either teacher, or student, or contact school adminstration."})
      }
    }
  })
}

const saveAccount = (_user, res, role, slug) => {
  if(role.toLowerCase() ==='teacher')
  {
    TeacherModel.findOne({slug: slug})
    .exec((err, teacher) => {
      if(teacher){
        _user.save((error, data) => {
          if(error) return res.status(400).json({
            error: `something went wrong:${error}`
          })
          if(!role) role="teacher"
          if(data) return res.status(201).json({
            message: `${role} is registered successfuly..!`,
            result: data
            })
        });
      }
      else{
        res.status(404).json({error: "There's no teacher with those info, Please get register first or contact director!."})
      }
    });
  }
  else if(role.toLowerCase() === "director"){
    _user.save((error, data) => {
      if(error) return res.status(400).json({
        error: `something went wrong:${error}`
      })
      if(!role) role="student"
      if(data) return res.status(201).json({
        message: `${role} is registered successfuly..!`,
        result: data
      })
    });
  }
  else if(role.toLowerCase() === "student"){
    StudentModel.findOne({slug: slug})
    .exec((err, student) => {
      if(student){
        _user.save((error, data) => {
          if(error) return res.status(400).json({
            error: `something went wrong:${error}`
          })
          if(!role) role="student"
          if(data) return res.status(201).json({
            message: `${role} is registered successfuly..!`,
            result: data
          })
        });
      }
      else{
        res.status(404).json({error: "There's no student with those info, Please register first, or contact school adminstration."})
      }
        
    });
  }
  else{
    res.status(404).json({role: "Please Specify your role as either student or teacher"})
  }
}

exports.signin = (req, res) => {
  if(req.body.email){
    User.findOne({email: req.body.email})
    .exec((error, user) => {
      if(!user) return res.status(400).json({message: `Wrong username or Password, Please try again`})
      else if(user) {
        if(user.authenticate(req.body.password)){
          const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRETE, 
            {expiresIn: '1d'});
          res.cookie('token', token, {expiresIn: '1d'})
          const {_id, userName, firstName, lastName, email, role, fullName} = user;
          res.status(200).json({
            token: token,
            user: {_id, userName, firstName, lastName, email, role, fullName}
          })
        }
        else {
          return res.status(400).json({message: "Wrong username or Password, Please try again"})
        }
      }
    });
  }

  else if(req.body.userName){
    User.findOne({userName: req.body.userName})
    .exec((error, user) => {
      if(!user) return res.status(409).json({message: "Wrong username or Password, Please try again"})
      else{
        if(user.authenticate(req.body.password)){
          const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRETE, 
            {expiresIn: '1d'});
          res.cookie('token', token, {expiresIn: '1d'})
          const {_id, userName, firstName, lastName, email, role, fullName} = user;
          res.status(200).json({
            token: token,
            user: {_id, userName, firstName, lastName, email, role, fullName}
          })
        }
        else {
          return res.status(400).json({message: "Wrong username or Password, Please try again"})
        }
      }
    });
  }
  else{
    return res.status(400).json({BadRequest: "Please enter userName or email"})
  }
}

exports.signout = (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({message: "signout successfuly...!"})
}