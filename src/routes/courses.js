const express = require('express');
const router = express.Router();

const { fetchCourses, 
        fetchCourseByTitle,
        deleteCourse,
        approveCourse,
        registerCourse
      } = require('../controllers/courses');
const { requireSignin, adminMiddleware, adminTeacherMiddleware } = require('../common-ware');
const { courseValidation, isRequestValidatedCourse } = require('../validators/courseValidator');

router.get('/courses/get', fetchCourses);
//router.get('/courses/:title', fetchCourseByTitle);
router.post('/courses/register', requireSignin, adminTeacherMiddleware, courseValidation, isRequestValidatedCourse, registerCourse);
//router.put('/courses/approval', requireSignin, adminMiddleware, approveCourse);
//router.delete('/courses/delete/:_id', requireSignin, adminTeacherMiddleware, deleteCourse);

module.exports = router;