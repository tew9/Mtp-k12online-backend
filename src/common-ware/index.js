const jwt = require('jsonwebtoken');

exports.requireSignin = (req, res, next) => {
  if(req.headers.authorization){
    const token = req.headers.authorization.split(" ")[1];
    try
    {
      const user = jwt.verify(token, process.env.JWT_SECRETE)
      req.user = user;
      next();
    }
    catch(err){
      res.status(403).json("You're signed out, Please, signin first as teacher or director to view all students.")
    }
  }
  else {
    res.status(403).json({Access_Denied: "You must signin first"})
  }
}

//middleware to instersect student registration to only the admin
exports.adminMiddleware = (req, res, next) => {
  if(req.user && req.user.role !== 'director'){
    return res.status(401).json({message: "UnAuthorized access, SignIn as coordinator/director!"})
  }
  next();
}

exports.adminTeacherMiddleware = (req, res, next) => {
  if(req.user && req.user.role !== 'director' && req.user && req.user.role !== 'teacher'){
    return res.status(401).json({message: "UnAuthorized Access, You need to be Authorized, Signin as Teacher or Director!"})
  }
  next();
}

exports.studentMiddleware = (req, res, next) => {
  if(req.user.role !== 'student'){
    return res.status(401).json({message: "You need to be Authorized!"})
  }
  next();
}