const alumni = require('../models/alumniModel')

const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const alumniMiddleware =asyncHandler(async(req,res,next)=>{
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")){
        token=req.headers.authorization.split(" ")[1];
        try {
            if(token){
                const decoded=jwt.verify(token,process.env.JWT_SECRET);
                const alumni =await alumni.findById(decoded?.id);
                req.alumni = alumni;
                next();
            }
        } catch (error) {
            throw new Error("Not authorized token expired , PLease Login again");
            
        }
    }else{
        throw new Error("There is no token attached to header");
    }
  });

  //new middleware

  const isAdmin=asyncHandler(async(req,res,next)=>{
    console.log(req.alumni);
    const {email} = req.alumni;
    const adminAlumni = await User.findOne({email});
    if(adminAlumni.role!=="admin"){
      throw new Error("You are not an admin");
    }
    else{
      next();
    }
  });

  module.exports = { alumniMiddleware , isAdmin };