const express = require('express');
const router = express.Router();
const { fetchSubjects, 
        updateSubject,
        fetchSubject,
        deleteSubject,
        registerSubject
      } = require('../controllers/subjects');
const { requireSignin, adminMiddleware, adminTeacherMiddleware } = require('../common-ware');
const { SubjectValidation, isRequestValidatedSubject , subjectUpdateValidation} = require('../validators/subjectValidator');

router.get('/subjects/get', fetchSubjects);
router.get('/subjects/:_id', fetchSubject);
router.post('/subjects/register', requireSignin, adminTeacherMiddleware, SubjectValidation, isRequestValidatedSubject, registerSubject);
router.put('/subjects/update', requireSignin, adminTeacherMiddleware, subjectUpdateValidation, isRequestValidatedSubject, updateSubject);
router.delete('/subjects/delete/:_id', requireSignin, adminTeacherMiddleware, deleteSubject);

module.exports = router;