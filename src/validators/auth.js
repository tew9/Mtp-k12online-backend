const { check, validationResult } = require('express-validator');

exports.validateRequestSignup = [
  check('firstName')
  .notEmpty()
  .withMessage('firstName is required'),
  check('lastName')
  .notEmpty()
  .withMessage('lastName is required'),
  check('email')
  .notEmpty()
  .withMessage('email is required'),
  check('role')
  .notEmpty()
  .withMessage('role is required, like director, teacher or student'),
  check('password')
  .isLength({ min: 6 }).withMessage('password is required and it must be at least 6 chars long')
  .matches(/\d/).withMessage('must contain a number')
  .matches(/[A-Z]/).withMessage('must contain at least one Uppercase')
]

exports.isRequestValidatedSignup = (req, res, next) => {
  const errors = validationResult(req);
  if(errors.array().length > 0){
    return res.status(400).json({error: errors.array()[0].msg})
  }
  next();
}


exports.validateRequestSignin = [
  check('password')
  .notEmpty().withMessage('Password is required')
]

exports.isRequestValidatedSignin = (req, res, next) => {
  const errors = validationResult(req);
  if(errors.array().length > 0){
    return res.status(400).json({error: errors.array()[0].msg})
  }
  next();
}