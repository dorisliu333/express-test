const User = require('../models/user');
const {generateToken} = require('../utils/jwt')

async function addUser(req,res){
    const {username,password} = req.body;

    const existingUser = await User.findOne({username}).exec();
    if(existingUser){
        return res.status(409).json('User already exist')
    }

    const user = new User({username,password});
    await user.hashPassword();
    await user.save();
    const token = generateToken({id:user._id})
    return res.json({token,username}).sendStatus(201);
}

module.exports = {addUser};


