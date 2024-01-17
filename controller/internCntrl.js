const Intern = require('../models/InternModel')
const asyncHandler =  require('express-async-handler')
const bcrypt = require('bcrypt')
const { generateToken  } = require('../config/jwtToken')
const{  generateRefreshToken } = require("../config/refreshToken")
const jwt = require('jsonwebtoken');

//signup of Intern 

const signUp = asyncHandler( async (req, res) => {
    const email = req.body.email;
    const findIntern = await Intern.findOne({email : email})
    if (!findIntern) {
        const newIntern = await Intern.create(req.body)
        res.json(newIntern)
    } else {
        throw new Error("Invalid Credentials")
    }
})

//login of Intern

const login = asyncHandler ( async ( req, res) => {
    const { email , password } = req.body
    const findIntern = await Intern.findOne({email : email})
    if (findIntern && (await findIntern.isPasswordMatched(password)) ) {
       // res.json("login successful")
       const refreshToken = await generateRefreshToken(findIntern?._id)  //add after,,for refreshtoken
        const updateIntern = await Intern.findByIdAndUpdate(findIntern.id, {
            refreshToken : refreshToken
        },
        {new:true}
        );

        res.cookie("refreshToken", refreshToken, {
            httpOnly : true,
            maxAge : 72 * 60 * 60 * 1000
        })  //cookie-parser
        res.json({
            _id: findIntern?._id,
            fullName: findIntern?.fullName,
            email: findIntern?.email,
            contactNo: findIntern?.contactNo,
            collegeName : findIntern?.collegeName,
            selectField : findIntern?.selectField,
            selectYear : findIntern?.selectYear,
            domainName: findIntern?.domainName,
            token: generateToken(findIntern?._id),
        });
    } else {
        throw new Error("Invalid credentials")
    }
})

// get all intern

const getAll = asyncHandler (async (req, res) => {
    try {
        const get = await Intern.find()
        res.json(get)
    } catch (error) {
        throw new Error(error)
    }
})

//get intern by id

const gets = asyncHandler ( async ( req, res) => {
    const {id} = req.params
    try {
        const getI = await Intern.findById(id)
        res.json(getI)
    } catch (error) {
        throw new Error(error)
    }
})

// update a Intern

const updateIntern = asyncHandler( async ( req, res) => {
    const {id} = req.params
    try {
        const updated = await Intern.findByIdAndUpdate(id,
            {
                fullName : req?.body?.fullName,
                email : req?.body?.email,
                contactNo : req?.body?.contactNo,
                collegeName : req?.body?.collegeName,
                selectField : req?.body?.selectField,
                selectYear : req?.body?.selectYear,
                domainName : req?.body?.domainName,

            },
            { new : true})
            res.json(updated)
            
       
    } catch (error) {
        throw new Error(error)
    }
})

// delete by id

const deleteIntern  = asyncHandler( async ( req, res) => {
    const {id} = req.params
    try {
        const deleted = await Intern.findByIdAndDelete(id)
        res.json({message : "intern deleted" , deleted})
        
    } catch (error) {
        throw new Error(error)
    }
})

// password functionalities

// update password

const updatePassword = asyncHandler (async (req, res) => {
   
        const { id } = req.params
        const { password } = req.body
        
        const updatedIntern = await Intern.findById(id)
        if ( password ) {
            Intern.password = password
            const newPassword = await updatedIntern.save()
            res.json(newPassword)
        } else {
            res.json(Intern)
        }
          
 } );


module.exports = {
    signUp,
    login,
    getAll,
    gets,
    updateIntern,
    deleteIntern,
    updatePassword
}