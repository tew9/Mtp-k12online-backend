const express = require('express');
const router = express.Router();
const shortid = require('shortid');

const { fetchClasses, 
        fetchClass, 
        registerClass, 
        deleteClass
      } = require('../controllers/classes');
const { requireSignin, adminMiddleware, adminTeacherMiddleware } = require('../common-ware');
const { classValidation, isRequestValidatedClass } = require('../validators/classValidator');

//router.get('/class/get/:title',  fetchStudent);
router.get('/classes/get', fetchClasses);
router.post('/classes/register', requireSignin, adminTeacherMiddleware,classValidation, isRequestValidatedClass, registerClass);
//router.put('/class/update', requireSignin, adminMiddleware, approveStudent);
//router.delete('/class/delete/:_id', requireSignin, adminMiddleware, deleteStudent);

module.exports = router;