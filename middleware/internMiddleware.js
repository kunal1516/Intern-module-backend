const intern = require('../models/InternModel')

const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const internMiddleware =asyncHandler(async(req,res,next)=>{
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")){
        token=req.headers.authorization.split(" ")[1];
        try {
            if(token){
                const decoded=jwt.verify(token,process.env.JWT_SECRET);
                const intern =await intern.findById(decoded?.id);
                req.intern = intern;
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
    console.log(req.intern);
    const {email} = req.intern;
    const adminIntern = await Intern.findOne({email});
    if(adminIntern.role!=="admin"){
      throw new Error("You are not an admin");
    }
    else{
      next();
    }
  });

  module.exports = { internMiddleware , isAdmin };