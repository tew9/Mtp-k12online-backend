const express = require('express');
const router = express.Router();
const { fetchSubjects, 
        updateSubject,
        fetchSubject,
        deleteSubject,
        registerSubject
      } = require('../controllers/subjects');
const { requireSignin, adminTeacherMiddleware } = require('../common-ware');
const { SubjectValidation, isRequestValidatedSubject} = require('../validators/subjectValidator');

router.get('/subjects/get', fetchSubjects);
router.get('/subjects/:_id', fetchSubject);
router.post('/subjects/register', requireSignin, adminTeacherMiddleware, SubjectValidation, isRequestValidatedSubject, registerSubject);
router.put('/subjects/update/:_id', requireSignin, adminTeacherMiddleware, updateSubject);
router.delete('/subjects/delete/:_id', requireSignin, adminTeacherMiddleware, deleteSubject);

module.exports = router;