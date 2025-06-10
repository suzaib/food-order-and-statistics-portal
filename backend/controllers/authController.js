const User=require("../models/users.js");
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const authService=require('../services/authService.js');

const brandMapping = {
    'shawarmaji': 'Shawarmaji',
    'madmomos': 'Mad Momos',
    'theyellowmustard': 'The Yellow Mustard',
    'wakaofoods': 'Wakao Foods',
    'tacobell': 'Taco Bell',
    'sbarro': 'Sbarro',
    'wowmomos': 'Wow Momos',
    'grubwala': 'GrubWala',
    'galavendor': 'Gala Vendor',
    'blazingbbq': 'Blazing bbq',
    'theappetitemomos': 'The Appetite Momos',
    'sodaterian': 'Sodaterian',
    'rollsmania': 'Rolls Mania',
    'mgs': 'MGS',
    'feastateast': 'Feast at East',
    'freakyfoods': 'Freaky Foods',
    'thej': 'The J',
    'tasteofhyderabad': 'Taste of Hyderabad',
    'hotdogharbour': 'Hotdog Harbour',
    'frozenbottle': 'Frozen Bottle',
    'starbucks': 'Starbucks',
    'apsaraicecream': 'Apsara Ice Cream',
    'juicepoint': 'Juice Point',
    'hungerfoods': 'Hunger Foods',
    'pvr': 'PVR',
    'ufo':"UFO",
    'eatsnap':'EatSnap',
    'zatar':'Zatar'
  };
  

  const handleLogin=async(req,res)=>{
    try{
        //Extracting email and password from the request
        const {email,password}=req.body;

        //Find user by email
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:'Invalid credentials'});
        }

        //Verifying the password
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:'Invalid Credentials'});
        }
        //Extracting brand name from email
        const emailPrefix=email.split('@')[0].toLowerCase();
        if(brandMapping[emailPrefix]){
            const brand=brandMapping[emailPrefix];
        }
        else{
            const brand="brand";
        }
        const brand=brandMapping[emailPrefix];

        //Generating JWT Token
        const token=authService.generateToken(user);
        res.json({token,role:user.role,brand});
    }catch(error){
        console.error('Error during login',error);
        res.status(500).json({message:'Server error'});
    }
  }

module.exports={
    handleLogin
}