const Teacher = require ('../models/teacher.js')
const Course = require('../models/course')

async function getAllTeachers(req,res){
    const teachers = await Teacher.find().exec();
    return res.json(teachers);
} 
async function getTeacherById(req,res){
    const {id} = req.params;
    const teacher = await Teacher.findById(id).populate('courses').exec();
    if(!teacher){
        return res.sendStatus(404)
    }
    return res.json(teacher)
}
async function updateTeacherById(req,res){
    const {id} = req.params;
    const {firstName,lastName,email} = req.body;
    const teacher = Teacher.findByIdAndUpdate(id,{firstName,lastName,email},{new:true}).exec();
    if(!teacher){
        return res.sendStatus(404);
    } 
    return res.json(teacher)
}
async function deleteTeacherById(req,res){
    const {id} = req.params;
    const teacher = Teacher.findByIdAndDelete(id).exec();
    if(!teacher) return res.sendStatus(404);
    await Course.updateMany({
        teachers:teacher._id
    },{
        $pull:{
            teachers:teacher._id
        }
    })
    return res.sendStatus(204)
}
async function createTeacher(req,res){
    const {firstName,lastName,email}=req.body;
    const teacher = new Teacher({firstName,lastName,email});
    await teacher.save();
    return res.status(201).json(teacher)
}
async function addTeacherToCourse(req,res){
    const {id,code} = req.params;
    const teacher = await Teacher.findById(id).exec();
    const course = await Course.findById(code).exec();
    if(!teacher || !course ) {return res.json('no teacher or course found').sendStatus(404)};
    // console.log(course.teachers[0].id)
    // if(course.teachers.length>=1){return res.json('tis course has been assigned').sendStatus(404)}
    teacher.courses.addToSet(course._id);
    course.teachers.addToSet(teacher._id);
    await teacher.save();
    await course.save();
    return res.json(teacher)
}

async function removeTeacherFromCourse(req,res){
    const {id,code} = req.params;
    const teacher = await Teacher.findById(id).exec();
    const course = await Course.findById(code).exec();
    if(!teacher || !course) {return res.sendStatus(404)};
    teacher.courses.pull(course._id);
    course.teachers.pull(teacher._id);

    await teacher.save();
    await course.save();
    return res.json(teacher);
}

module.exports={
    getAllTeachers,
    updateTeacherById,
    getTeacherById,
    deleteTeacherById,
    createTeacher,
    addTeacherToCourse,
    removeTeacherFromCourse
}