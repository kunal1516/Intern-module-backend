const User=require('../models/userModel');
const asyncHandler=require('express-async-handler')

//register a user
const register=asyncHandler(async(req,res)=>{
    const newUser =await User.create(req.body);
    res.json(newUser);
})
module.exports= register;