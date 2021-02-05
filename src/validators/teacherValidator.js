const { check, validationResult } = require('express-validator');

exports.teacherValidation = [
  check('firstName')
  .notEmpty()
  .withMessage('firstName is required, Please enter it as "firstName" '),
  check('lastName')
  .notEmpty()
  .withMessage('lastName is required, Please enter it as "lastName"'),
  check('gender')
  .notEmpty()
  .withMessage('gender is required, Please enter it as "gender"'),
  check('dob')
  .notEmpty()
  .withMessage('date of birth is required, Please enter it as "dob"'),
  check('email')
  .notEmpty()
  .withMessage('date of birth is required, Please enter it as "dob"'),
  check('contact')
  .notEmpty()
  .withMessage('Please enter your contacts, atlease email or phone number')
]

exports.isRequestValidatedTeacher = (req, res, next) => {
  const errors = validationResult(req);
  if(errors.array().length > 0){
    return res.status(400).json({error: errors.array()[0].msg})
  }
  next();
}
