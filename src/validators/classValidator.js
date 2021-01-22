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
  .withMessage('subjects is required'),
]

exports.isRequestValidatedClass = (req, res, next) => {
  const errors = validationResult(req);
  if(errors.array().length > 0){
    return res.status(400).json({error: errors.array()[0].msg})
  }
  next();
}
