const Course = require('../models/course')
const Joi = require('joi')
const Student = require('../models/student')
const Teacher = require('../models/teacher')


async function getAllCourses(req,res){
   const courses= await Course.find().exec();
   res.json(courses)
}
async function getCourseById(req,res){
    const {id} = req.params;
    console.log(id);
    const course = await Course.findById(id).populate('students').populate('teachers').exec();
    if(!course){
        return res.sendStatus(404);
    }
    return res.json(course)
}
async function updateCourseById(req,res){
    
    const {id} = req.params;
    const {name,description} = req.body;
    const course = await Course.findByIdAndUpdate(id,{name,description},{new:true});
    if(!course){
        return  res.sendStatus(404);
    }
    return res.json(course)
}
async function deleteCourseById(req,res){
    const {id} = req.params;
    const course = await Course.findByIdAndDelete(id);
    if(!course){
        return  res.sendStatus(404);
    }

    await Student.updateMany({
        courses:course._id
    },{
        $pull:{courses:course._id}
    })

    await Teacher.updateMany({
        courses:course._id
    },{
        $pull:{courses:course._id}
    }
    )
    return res.sendStatus(204);
}
async function createCourse(req,res){
    // const {code,name,description}=req.body;
    const stringValidator = Joi.string().min(2).max(10).required();
    const schema = Joi.object({
        name:stringValidator,
        code:Joi.string()
            .regex(/^[a-zA-Z0-9]+$/)
            .required(),
        description:Joi.string()
    })
    const {code,name,description}= await schema.validateAsync(req.body,{
        allowUnknow:true,
        stripUnknow:true,
        abortEarly:false
    })
    const existCourse = await Course.findById(code).exec();
    if(existCourse){
        return res.sendStatus(409);
    }
    const course = new Course({_id:code,name,description});   
    await course.save();
    return res.status(201).json(course)
}

module.exports={
    getAllCourses, 
    updateCourseById,
    getCourseById,
    deleteCourseById,
    createCourse
}