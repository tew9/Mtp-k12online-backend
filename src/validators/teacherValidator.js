const { check, validationResult } = require('express-validator');

exports.teacherValidation = [
  check('firstName')
  .notEmpty()
<<<<<<< HEAD
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
=======
  .withMessage('firstName is required, Please enter it as firstName.'),
  check('lastName')
  .notEmpty()
  .withMessage('lastName is required, Please enter it as lastName.'),
  check('dob')
  .notEmpty()
  .withMessage('Date of birth is required, Please enter it as dob.'),
  check('gender')
>>>>>>> 20c535106be5fa766ce732d3bf4deba837e94618
  .notEmpty()
  .withMessage('Please enter your gender as gender.'),
  check('city')
  .notEmpty()
  .withMessage('city/town is required, Please enter it as city.'),
  check('county')
  .notEmpty()
  .withMessage('county/kebele is required, Please enter it county.'),
  check('state')
  .notEmpty()
  .withMessage('state/Province is required, Please enter it as state.'),
  check('country')
  .notEmpty()
  .withMessage('country is required, Please enter it as country.'),
  check('email')
  .notEmpty()
  .withMessage('email address is required, Please enter it as email.'),
]

exports.isRequestValidatedTeacher = (req, res, next) => {
  const errors = validationResult(req);
  if(errors.array().length > 0){
    return res.status(400).json({error: errors.array()[0].msg})
  }
  next();
}
