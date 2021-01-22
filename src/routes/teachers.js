const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const multer = require('multer');

const { fetchTeachers, 
        fetchTeacher, 
        registerTeacher, 
        deleteTeacher,
        approveTeacher
      } = require('../controllers/teachers');
const { requireSignin, adminMiddleware , adminTeacherMiddleware } = require('../common-ware');
const { teacherValidation, isRequestValidatedTeacher } = require('../validators/teacherValidator');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), 'uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() +' '+file.originalname)
  }
})

var upload = multer({ storage: storage })

// router.get('/teacher/get/:lastName',  fetchStudent);
router.get('/teacher/get', requireSignin, adminTeacherMiddleware, fetchTeachers);
router.post('/teacher/register', requireSignin, teacherValidation, isRequestValidatedTeacher, upload.single('teacherPicture'), registerTeacher);
//router.put('/teacher/approval', requireSignin, adminMiddleware, approveStudent);
//router.delete('/teacher/delete/:_id', requireSignin, adminMiddleware, deleteStudent);

module.exports = router;