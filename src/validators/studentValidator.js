
const { check, validationResult } = require('express-validator');

exports.studentValidation = [
  check('firstName')
  .notEmpty()
  .withMessage('firstName is required'),
  check('lastName')
  .notEmpty()
  .withMessage('lastName is required'),
  check('dob')
  .notEmpty()
  .withMessage('Date of birth is required as dob'),
  check('gender')
  .notEmpty()
  .withMessage('Please enter your gender as male or female.'),
  check('city')
  .notEmpty()
  .withMessage('city/town is required'),
  check('county')
  .notEmpty()
  .withMessage('county/kebele is required'),
  check('state')
  .notEmpty()
  .withMessage('State/Province is required'),
]

exports.isRequestValidatedStudent = (req, res, next) => {
  const errors = validationResult(req);
  if(errors.array().length > 0){
    return res.status(400).json({error: errors.array()[0].msg})
  }
  next();
}



