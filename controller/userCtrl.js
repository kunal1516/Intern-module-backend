const User = require('../models/userModel');
//const router = express.Router()
const Alumni = require ( '../models/alumniModeli')
const Intern = require ( '../models/InternModel')
const asyncHandler=require('express-async-handler')

//sign  up a user
const signUp = asyncHandler(async (req , res) => {
    const email = req.body.email
    const findUser = await User.findOne({email : email})
    if (!findUser) {
        //create a new User
        const newUser = await User.create(req.body);
        res.json(newUser)

    }
    else {
        throw new Error('User Already Exists')
    }
} )

// login user

const login = asyncHandler (async ( req, res) => {
    const {email , password} = req.body
    const findUser = await User.findOne({email : email, password : password})
    if(findUser && (await findUser.isPasswordMatched(password))) 
    {
        res.body("login successfull!!")
    }
    else {
        throw new Error("invalid credentials")
    }

})
module.exports= {
    signUp,
    login
}