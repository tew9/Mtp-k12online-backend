const { check, validationResult } = require('express-validator');

exports.teacherValidation = [
  check('firstName')
  .notEmpty()
  .withMessage('firstName is required'),
  check('lastName')
  .notEmpty()
  .withMessage('lastName is required'),
  check('address')
  .notEmpty()
  .withMessage('Please enter your address, atleast city, state and country'),
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
