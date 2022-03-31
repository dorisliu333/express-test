const express = require('express');
const {
    getAllCourses, 
    updateCourseById,
    getCourseById,
    deleteCourseById,
    createCourse
}= require ('../controllers/courses.js')

const router = express.Router();

router.post('/',createCourse);
router.get('/',getAllCourses);
router.get('/:id',getCourseById);
router.put('/:id',updateCourseById);
router.delete('/:id',deleteCourseById);

module.exports = router;
