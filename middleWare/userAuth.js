function validateUser(req,res,next){
    const {firstName,lastName,email,password}=req.body
    if(!firstName||!lastName||!email||!password){
        res.status(400).json({message:"Please provide First, Last, Email & Password to register"})
    }else{next()}
}


function validateUserLogin(req,res,next){
    const {email,password}=req.body
    if(!email||!password){
        res.json({message:"Please Provide Email & Password to login"})
    }else(next())
}

module.exports={
    validateUser,
    validateUserLogin
}