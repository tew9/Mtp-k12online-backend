const { check, validationResult } = require('express-validator');

exports.classValidation = [
  check('title')
  .notEmpty()
  .withMessage('title is required'),
  check('capacity')
  .notEmpty()
  .withMessage('capacity is required, approximate of how many students the class would sustains'),
  check('subjects')
  .notEmpty()
  .withMessage('Atleast one subject is required for a class to be created.'),
]

exports.classUpdateValidation = [
  check('title')
  .notEmpty()
  .withMessage('Please enter the name of the class you want to update, as title'),
]

exports.isRequestValidatedClass = (req, res, next) => {
  const errors = validationResult(req);
  if(errors.array().length > 0){
    return res.status(400).json({error: errors.array()[0].msg})
  }
  next();
}
