const Alumni = require('../models/alumniModel');
const asyncHandler=require('express-async-handler');
const bcrypt = require('bcrypt')
const { generateToken  } = require('../config/jwtToken')
const{  generateRefreshToken } = require("../config/refreshToken")
const jwt = require('jsonwebtoken');
const { findByIdAndUpdate } = require('../models/InternModel');
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

module.exports= {signUp , login , getAlumni , getAllAlumni , deleteAlumni , updateAlumni} 

