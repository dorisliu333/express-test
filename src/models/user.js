const {Schema,model} = require('mongoose');
const bcrypt = require("bcrypt");

const schema = new Schema({
    username:{
        type:String,
        require:true,
        minlength:2,
    },
    password:{
        type:String,
        require:true,
        trim:true
    }
});

// static method->model.functionName 
// instance method->document.functionName

schema.methods.hashPassword = async function(){
    this.password = await bcrypt.hash(this.password,12);
}

schema.methods.validatePassword = async function(password){
    return bcrypt.compare(password, this.password)
}

module.exports = model('User',schema)