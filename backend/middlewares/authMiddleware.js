const jwt=require("jsonwebtoken");

//Middleware verifies JWT and checks role
const verifyToken=(req,res,next)=>{
    const token=req.header('Authorization')?.split(' ')[1];

    if(!token){
        return res.status(403).json({message:'Access Denied'});
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }
    catch(err){
        res.status(400).json({message:'Invalid token'});
    }
}

//MIddleware to check role
const checkRole=(role)=>{
    return (req,res,next)=>{
        if(req.user.role!==role){
            return res.status(403).json({message:'Forbidden: Invalid role'})
        }
        next();
    }
}

module.exports={verifyToken,checkRole};