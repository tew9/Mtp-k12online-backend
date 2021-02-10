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

      if(role === 'director'){
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

      if(role === 'student'){
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
    }
  })
}

const saveAccount = (_user, res, role, slug) => {
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
    else if(role == "director"){
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
          res.status(404).json({error: "there's no teacher/student with those info, Please register first."})
        }
        
      });
    }
  });
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

  if(req.body.userName){
    User.findOne({userName: req.body.userName})
    .exec((error, user) => {
      if(!user) return res.status(409).json({message: "Wrong username or Password, Please try again"})

      else if(user){
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
}

exports.signout = (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({message: "signout successfuly...!"})
}