const User = require('../models/auth');
const jwt = require('jsonwebtoken');
const bcrpt = require('bcrypt');
const salt = 10; 

exports.signup = (req, res) => {
  User.findOne({email: req.body.email})
  .exec(async (error, user) => {
    if(user){
      return res.status(409).json({message: `admin already registered with ${req.body.email}`
    })
    }
    else {
      //create an account
      const {firstName, lastName, email, password, role } = req.body;
      const hash_password = await bcrpt.hash(password, salt);
      if(role === 'teacher'){
        const _user  = new User({
          firstName,
          lastName,
          email,
          hash_password,
          userName: `${firstName}.${lastName}`,
          role: 'teacher'
        });
        saveAccount(_user, res, role);
      }

      if(role === 'director'){
        const _user  = new User({
          firstName,
          lastName,
          email,
          hash_password,
          userName: `${firstName}.${lastName}`,
          role: 'director'
        });
        saveAccount(_user, res, role);
      }

      if(role === 'student'){
        const _user  = new User({
          firstName,
          lastName,
          email,
          hash_password,
          userName: `${firstName}.${lastName}`,
          role: 'student'
        });
        saveAccount(_user, res, role);
      }
    }
  })
}

const saveAccount = (_user, res, role) => {
  _user.save((error, data) => {
  if(error) return res.status(400).json({
    message: `something went wrong:${error}`
  })
  if(!role) role="Teacher"
  if(data) return res.status(201).json({
    message: `${role} is registered successfuly..!`
    })
  });
}

exports.signin = (req, res) => {
  if(req.body.email){
    User.findOne({email: req.body.email})
    .exec((error, user) => {
      if(!user) return res.status(409).json({message: `Sorry!, this email doesn't exists`})
      
      if(user) {
        if(user.authenticate(req.body.password)){
          console.log(user._id, user.role)
          const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRETE, 
            {expiresIn: '1d'});
          res.cookie('token', token, {expiresIn: '1d'})
          const {_id, userName, firstName, lastName, email, role, fullName} = user;
          res.status(200).json({
            token: token,
            user: {_id, userName, firstName, lastName, email, role, fullName}
          })
        }else {
          return res.status(400).json({message: "username or password is incorrect, try again!!!"})
        }
      }
    });
  }

  if(req.body.userName){
    User.findOne({userName: req.body.userName})
    .exec((error, user) => {
      if(!user) return res.status(409).json({message: `Sorry!, No user with given username`})

      if(user){
        if(user.authenticate(req.body.password)){
          const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRETE, 
            {expiresIn: '1d'});
          res.cookie('token', token, {expiresIn: '1d'})
          const {_id, userName, firstName, lastName, email, role, fullName} = user;
          res.status(200).json({
            token: token,
            user: {_id, userName, firstName, lastName, email, role, fullName}
          })
        }else {
          return res.status(400).json({message: "username or password is incorrect, try again!!!"})
        }
      }
    });
  }
}

exports.signout = (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({message: "signout successfuly...!"})
}