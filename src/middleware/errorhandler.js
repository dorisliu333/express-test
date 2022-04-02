module.exports = (error,req,res,next)=>{
    if(error.name === "ValidationError"){
        if(process.env.NODE_ENV === "production"){
                const {details} = error;
                const errMsg = details.map((i)=>{return { message:i.message }})
                return res.status(400).json(errMsg)
        }else{
            return res.status(400).json(error)
        }
    }

    return res.status(500).send(error.message)
};

//if error instanceof CustomerError
//class CustomerError extends Error{}
 