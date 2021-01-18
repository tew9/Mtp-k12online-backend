
const { check, validationResult } = require('express-validator');

exports.studentValidation = [
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

exports.courseValidation = [
  check('title')
  .notEmpty()
  .withMessage('title is required'),
]


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

exports.addressValidation = [
  check('city')
  .notEmpty()
  .withMessage('city/town is required'),
  check('county')
  .notEmpty()
  .withMessage('county/kebele is required'),
  check('state')
  .notEmpty()
  .withMessage('State/Province is required'),
  check('country')
  .notEmpty()
  .withMessage('Country is required'),
]


exports.contactValidation = [
  check('email')
  .notEmpty()
  .withMessage('email address is required'),
  check('type')
  .notEmpty()
  .withMessage('either this a guardian or personal is required'),
]