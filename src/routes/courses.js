const express = require('express');
const router = express.Router();

const { fetchCourses, 
        fetchCourseByTitle,
        deleteCourse,
        registerCourse
      } = require('../controllers/courses');
const { requireSignin, adminMiddleware, adminTeacherMiddleware } = require('../common-ware');
const { courseValidation, isRequestValidatedCourse } = require('../validators/courseValidator');

router.get('/subjects/get', fetchCourses);
router.get('/subjects/:title', fetchCourseByTitle);
router.post('/subjects/register', requireSignin, adminTeacherMiddleware, courseValidation, isRequestValidatedCourse, registerCourse);
//router.put('/courses/approval', requireSignin, adminMiddleware, approveCourse);
router.delete('/subjects/delete/:_id', requireSignin, adminTeacherMiddleware, deleteCourse);

module.exports = router;