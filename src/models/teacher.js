const {Schema,model} = require ('mongoose');
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
                return !Joi.string().email().validate(email).error;
            },
            msg:"invalid email format"
        }
    },
    courses:[{type:String,ref:"Course"}]

})

module.exports=model('Teacher',schema)