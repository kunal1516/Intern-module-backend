const Intern = require('../models/InternModel')
const asyncHandler =  require('express-async-handler')
const bcrypt = require('bcrypt')
const generateToken = require('../config/jwtToken')
const generateRefreshToken = require("../config/refreshToken")

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
        const updateIntern = await User.findByIdAndUpdate(findIntern.id, {
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





module.exports = {
    signUp,
    login
}