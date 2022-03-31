const {Schema,model} = require('mongoose');
const Joi = require('joi');

const schema = new Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        validate:{
            validator:(email)=>{
                //joi  
                // const validation = Joi.string().email.validate(email);
                // const {error} = validation;
                // if(error){
                //     return false;
                // }else{
                //     return true;
                // } 
                return !Joi.string().email().validate(email).error;
            },
            msg:"invalid email format"
        }
    },
    //ref需要和相关的models导出时的名字一样
    courses:[{type:String,ref:'Course'}]
})
module.exports=model('Student',schema)