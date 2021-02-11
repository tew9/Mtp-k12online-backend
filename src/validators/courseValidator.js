const { check, validationResult } = require('express-validator');

exports.courseValidation = [
  check('title')
  .notEmpty()
  .withMessage('title is required, Please enter it as title'),
  check('level')
  .notEmpty()
  .withMessage('Subject level/grade is required, Please enter it as level'),
]

exports.isRequestValidatedCourse = (req, res, next) => {
  const errors = validationResult(req);
  if(errors.array().length > 0){
    return res.status(400).json({error: errors.array()[0].msg})
  }
  next();
}