const Student = require('../models/student')
const Course = require('../models/course')
//express-async-errors


// function tryCatch(routeHandler){
//     return (req,res,next)=>{
//         try{
//             routeHandler(req,res,next);
//         }catch(e){
//             next(e)
//         }
//     }
// }
//if use tryCatch, need to use in routes/students.js
//router.post('/',tryCatch(createStudent));


async function getAllStudents(req,res){
    const students = await Student.find().exec()
    res.json(students)
}
async function getStudentById(req,res){
    const {id} = req.params;
    const student = await Student.findById(id).populate('courses').exec();
    if(!student){
        return res.sendStatus(404);
    } 
    return res.json(student)
}

async function updateStudentById(req,res){
    const {id} = req.params;
    const {firstName, lastName, email} = req.body;
    const student = await Student.findByIdAndUpdate(id,{firstName, lastName, email},{new:true})
    if(!student){
        return res.sendStatus(404);
    }
    return res.json(student)
}
async function deleteStudentById(req,res){
    const {id} = req.params;
    const student = await Student.findByIdAndDelete(id);
    if(!student){
        return res.sendStatus(404);
    }  
    await Course.updateMany({
        students:student._id
    },{
        $pull:{
            students:student._id
        }
    }) 
    return res.sendStatus(204);
}
    
async function createStudent(req,res){
    const {firstName, lastName, email} = req.body;
    const student = new Student({firstName, lastName, email});
    //first way to catch error 
    // try{
    //     await student.save();
    // }catch(e){
    //     res.send(e)
    // }

    //second way to catch error     
    // student.save((error,result)=>{
    //     if(error){
    //         return next(e);
    //     }
    //     res.status(201).json(result);
    // })

    //third way to catch error promise
    // student.save().then((result)=>{
    //     res.status(201).json(result);
    // }).catch(error=>{
    //     next(error);
    // }) 
    await student.save();
    return res.status(201).json(student)
}

async function addStudentToCourse(req,res){
    // get student id, get course code
    const {id, code} = req.params;
    //find student
    const student = await  Student.findById(id).exec();
    //find course   
    const course = await Course.findById(code).exec();
    //check student and course exist
    if(!student||!course){
        return res.sendStatus(404)
    }
    //check student is already enrolled
    //add student to course
    student.courses.addToSet(course._id);
    course.students.addToSet(student._id);
    await student.save()
    await course.save()
    //return update student
    return res.json(student)
}

async function removeStudentFromCourse(req,res){
    const {id,code} = req.params;
    const student = await Student.findById(id).exec();
    const course = await Course.findById(code).exec();
    if(!student||!course){
        return res.sendStatus(404)
    }
    student.courses.pull(course._id);
    course.students.pull(student._id);

    await student.save();
    await course.save();

    return res.json(student)
}

module.exports={
    getAllStudents, 
    updateStudentById,
    getStudentById,
    deleteStudentById,
    createStudent,
    addStudentToCourse,
    removeStudentFromCourse
}


