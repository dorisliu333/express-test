const {validateToken} = require('../utils/jwt')

module.exports=(req,res,next)=>{
    const authHeader = req.header('Authorization')
    if(!authHeader){
        return res.sendStatus(401)
    }

    const contentArray = authHeader.split(' ');
    if(contentArray.length !==2 || contentArray[0]!=='Bearer'){
        return res.sendStatus(401);
    } 

    
    const decoded = validateToken(contentArray[1]);
    if(!decoded){
        return res.sendStatus(401);
    }
    req.user = decoded;
    next();
}