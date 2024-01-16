const Intern = require('../models/InternModel')
const asyncHandler =  require('express-async-handler')

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
    const findIntern = await Intern.findOne({email : email , password : password})
    if (findIntern && (await findIntern.isPasswordMatched(password)) ) {
        res.json("Login succefull!")
    } else {
        throw new Error(error)
    }
})

module.exports = {
    signUp,
    login
}