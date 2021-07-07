const express = require('express');
const router = express.Router();
const shortid = require('shortid');

const { fetchClasses, 
        fetchClass, 
        registerClass, 
        deleteClass,
        updateClass
      } = require('../controllers/classes');
const { requireSignin, adminMiddleware, adminTeacherMiddleware } = require('../common-ware');
const { classValidation, classUpdateValidation, isRequestValidatedClass } = require('../validators/classValidator');

router.get('/classes/get/:title',  fetchClass);
router.get('/classes/get', fetchClasses);
router.post('/classes/register', requireSignin, adminTeacherMiddleware,classValidation, isRequestValidatedClass, registerClass);
router.put('/classes/update/:_id', requireSignin, adminTeacherMiddleware, updateClass);
router.delete('/classes/delete/:_id', requireSignin, adminMiddleware, deleteClass);

module.exports = router;