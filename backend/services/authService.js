const jwt=require("jsonwebtoken");

//Generating JWT Tokens

const generateToken=(user)=>{
    return jwt.sign(
        {userId:user._id,role:user.role},
        process.env.JWT_SECRET,
        {expiresIn:'1h'}
    );
}

module.exports={
    generateToken
};