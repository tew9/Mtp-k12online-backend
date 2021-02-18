const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const multer = require('multer');

const { fetchStudents, 
        fetchStudent, 
        registerStudent, 
        deleteStudent,
        approveStudent
      } = require('../controllers/students');
const { requireSignin, adminTeacherMiddleware, adminMiddleware } = require('../common-ware');
const { studentValidation, isRequestValidatedStudent } = require('../validators/studentValidator');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), 'uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() +' '+file.originalname)
  }
})

var upload = multer({ storage: storage })

router.get('/students/get/:_id',  fetchStudent);
router.get('/students/get', requireSignin, adminTeacherMiddleware, fetchStudents);
router.post('/students/register', studentValidation, isRequestValidatedStudent,
                                 upload.single('studentPicture'), registerStudent);
router.put('/students/update/:_id', requireSignin, adminTeacherMiddleware, approveStudent);
router.delete('/students/delete/:_id', requireSignin, adminMiddleware, deleteStudent);

module.exports = router;