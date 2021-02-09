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
  .withMessage('email is required, Please enter it as "email"'),
  check('city')
  .notEmpty()
  .withMessage('city/town is required, Please enter it as "city".'),
  check('county')
  .notEmpty()
  .withMessage('county/kebele is required, Please enter it "county".'),
  check('state')
  .notEmpty()
  .withMessage('state/Province is required, Please enter it as "state".'),
  check('cellPhone')
  .notEmpty()
  .withMessage('cell phone is required, Please enter it as "cellPhone".'),
  check('occupation')
  .notEmpty()
  .withMessage('occupation or your position(goverment, self-employed, NGO, student) is required, Please enter it as "occupation".'),
]

exports.isRequestValidatedTeacher = (req, res, next) => {
  const errors = validationResult(req);
  if(errors.array().length > 0) {
    return res.status(400).json({error: errors.array()[0].msg})
  }
  next();
}
