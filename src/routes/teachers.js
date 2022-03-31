const express = require('express');
const {
    getAllTeachers,
    updateTeacherById,
    getTeacherById,
    deleteTeacherById,
    createTeacher,
    addTeacherToCourse,
    removeTeacherFromCourse
} = require('../controllers/teachers')
const router = express.Router();

router.post('/',createTeacher);
router.get('/',getAllTeachers);
router.get('/:id',getTeacherById);
router.put('/:id',updateTeacherById);
router.delete('/:id',deleteTeacherById);

router.post('/:id/courses/:code',addTeacherToCourse)
router.delete('/:id/courses/:code',removeTeacherFromCourse)

module.exports = router;
