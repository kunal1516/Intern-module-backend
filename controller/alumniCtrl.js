const Alumni = require('../models/alumniModel');
const asyncHandler=require('express-async-handler');
const bcrypt = require('bcrypt')
const { generateToken  } = require('../config/jwtToken')
const{  generateRefreshToken } = require("../config/refreshToken")
const jwt = require("jsonwebtoken");

//const validateMongoDbId = require("../utils/validateMongodbId");
//const { findByIdAndUpdate } = require('../models/InternModel');
//const router = express.Router();


//signup of Alumni 

const signUp = asyncHandler( async (req, res) => {
    const email = req.body.email;
    const findAlumni = await Alumni.findOne({email : email})
    if (!findAlumni) {
        const newAlumni = await Alumni.create(req.body)
        res.json(newAlumni)
    } else {
        throw new Error("Invalid Credentials")
}
});

const login = asyncHandler(async(req, res)=> {
    const { email, password } = req.body;

    // cheak if user exists or not
    const findAlumni = await Alumni.findOne({email:email});
    if(findAlumni && (await findAlumni.isPasswordMatched(password))){
        const refreshToken = await generateRefreshToken(findAlumni?._id);
        const updateAlumni = await Alumni.findByIdAndUpdate(
            findAlumni.id,
            {
                refreshToken: refreshToken,
            },
            {new: true}
        );
        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        res.json({
            _id: findAlumni?._id,
            firstname: findAlumni?.firstname,
            lastname: findAlumni?.lastname,
            email:findAlumni?.email,
            contactNo:findAlumni?.contactNo,
            current_Position:findAlumni?.current_Position,
            working_Company:findAlumni?.working_Company,
            address:findAlumni?.address,
            batch:findAlumni?.batch,

            token:generateToken(findAlumni?._id)
        });
    }else {
        throw new Error("Invalid Credentials");
    }
});



// Get a single alumni

const getAlumni = asyncHandler(async(req,res) => {
    const {id} = req.params;
    try {
        const getAlumni = await Alumni.findById(id);
        res.json({
            getAlumni,
        });
        
    } catch (error) {
        throw new Error(error);
        
    }
});

//get all alumni

const getAllAlumni = asyncHandler(async(req,res)=>{
    try {
        const getAlumni = await Alumni.find();
        res.json(getAlumni);
        
    } catch (error) {
        throw new Error(error);
        
    }
});

//delete Alumni 

const deleteAlumni = asyncHandler(async(req,res)=>{
    const {id}= req.params;
    try {
        const delAlumni = await Alumni.findByIdAndDelete(id);
        res.json(delAlumni);
        
    } catch (error) {
        throw new Error(error);
        
    }
});

//update Alumni 

const updateAlumni = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    try {
        const updateAlu = await Alumni.findByIdAndUpdate(id,{
            fullName:req?.body?.fullName,
            email:req?.body?.email,
            contactNo:req?.body?.contactNo,
            current_Position:req?.body?.current_Position,
            working_Company:req?.body?.working_Company,
            address:req?.body?.address,
            batch:req?.body?.batch,

        },{
            new:true,
        }
        );
        res.json(updateAlu)

        
    } catch (error) {
        throw new Error(error);
        
    }
});
const updatePassword = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { password, confirmPassword } = req.body;
    
    if (id.toLowerCase() === 'logout') {
        // Handle logout directly (if needed)
        return res.status(200).json({ success: true, message: 'Logout successful' });
    }

    try {
        const updatealumni = await Alumni.findById(id);
        if (password && confirmPassword) {
            updatealumni.password = password;
            updatealumni.confirmPassword = confirmPassword;
            const updatedPassword = await updatealumni.save();
            res.json(updatedPassword);
        } else {
            res.json(updatealumni);
        }
    } catch (error) {
        throw new Error(error);
    }
});



const handleRefreshToken = asyncHandler(async(req,res) => {
    const cookie = req.cookies;
    if(!cookie?.refreshToken) throw new Error ("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    console.log(refreshToken);
    const alumni = await Alumni.findOne({refreshToken});
    if(!alumni) throw new Error ("No Refresh token present in db or not matched");
    jwt.verify(refreshToken,process.env.JWT_SECRET,(err, decoded) => {
        if(err || alumni.id !== decoded.id){
            throw new Error("There is something wrong with refresh token");
        }
        const accessToken = generateToken(Alumni.id)
        res.json({accessToken});

    });
});

const logout = asyncHandler(async (req, res) => {
    try {
        // Assuming you are using a refresh token stored in a cookie
        const refreshToken = req.cookies.refreshToken;

        // Clear the refresh token on the server side
        await Alumni.findOneAndUpdate(
            { refreshToken: refreshToken },
            { $unset: { refreshToken: 1 } }
        );

        // Clear the refreshToken cookie on the client side
        res.clearCookie('refreshToken');

        res.status(200).json({ success: true, message: 'Logout successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

const forgotPasswordToken = asyncHandler(async(req,res)=>{
    const {email} = req.body;
    const alumni = await Alumni.findOne({email});
    if(!alumni) throw new Error("Alumni not found with this email");
    try {
       const token = await alumni.createPasswordResetToken();
       await alumni.save();
       const resetURL = `Hi , Please follow this link to reset your password. this link is valid till 10 minutes from now. <a href="http://localhost:5000/api/user/reset-password/${token}'>Click Here</a>`;   
       const data ={
           to: email,
           text:"Hey Alumni",
           text:"Hey Alumni",
           subject:"Forgot Password Link",
           htm: resetURL,
       };
       sendEmail(data);
       res.json(token);
    } catch (error) {
       throw new Error(error);
    }
    });
   
    const resetPassword = asyncHandler(async(req,res)=>{
      const {password} = req.body;
      const {token} = req.params;
      const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
      const alumni = await Alumni.findOne({
       passwordResetToken: hashedToken,
       passwordResetExpires:{$gt:Date.now()},
      });
      if(!alumni) throw new Error("Token Expired, Plz try again later");
      alumni.password = password;
      alumni.passwordResetToken = undefined;
      alumni.passwordResetExpires = undefined;
      await alumni.save();
      res.json(alumni);
    });
   





module.exports= {signUp , login , getAlumni , getAllAlumni , deleteAlumni , updateAlumni , updatePassword , handleRefreshToken , logout , forgotPasswordToken , resetPassword} 

