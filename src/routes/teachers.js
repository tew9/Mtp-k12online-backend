const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const multer = require('multer');

const { fetchTeachers,
        fetchTeacher,
        registerTeacher,
        deleteTeacher,
        updateTeacher,
      } = require('../controllers/teachers');
const { requireSignin, adminTeacherMiddleware, adminMiddleware } = require('../common-ware');
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

router.get('/teachers/get/:_id',  fetchTeacher);
router.get('/teachers/get', requireSignin, adminTeacherMiddleware, fetchTeachers);
router.post('/teachers/register', teacherValidation, isRequestValidatedTeacher, upload.single('teacherPicture'), registerTeacher);
router.put('/teachers/update/:_id', requireSignin, adminTeacherMiddleware, updateTeacher);
router.delete('/teachers/delete/:_id', requireSignin, adminMiddleware, deleteTeacher);

module.exports = router;