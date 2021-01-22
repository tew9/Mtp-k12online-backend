const express = require('express');
const router = express.Router();
const shortid = require('shortid');

const { fetchStudents, 
        fetchStudent, 
        registerStudent, 
        deleteStudent,
        approveStudent
      } = require('../controllers/students');
const { requireSignin, adminMiddleware } = require('../common-ware');
const { classValidation, isRequestValidatedClass } = require('../validators/classValidator');

//router.get('/class/get/:title',  fetchStudent);
router.get('/class/get', fetchStudents);
router.post('/class/register', requireSignin, adminMiddleware, registerStudent);
//router.put('/class/update', requireSignin, adminMiddleware, approveStudent);
//router.delete('/class/delete/:_id', requireSignin, adminMiddleware, deleteStudent);

module.exports = router;