const express = require('express');
const {getAllStudents, 
    updateStudentById,
    getStudentById,
    deleteStudentById,
    createStudent,
    addStudentToCourse,
    removeStudentFromCourse} = require("../controllers/students")
const router = express.Router();

router.post('/',createStudent);
router.get('/',getAllStudents);
router.get('/:id',getStudentById);
router.put('/:id',updateStudentById);
router.delete('/:id',deleteStudentById);

router.post('/:id/courses/:code',addStudentToCourse);
router.delete('/:id/courses/:code',removeStudentFromCourse);

module.exports = router;