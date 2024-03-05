const SuperAdmin = require('../models/superAdminModel');
const asyncHandler = require('express-async-handler');
//const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../config/jwtToken');
const { generateRefreshToken } = require('../config/refreshToken')

//signup of superAdmin 

const signUp = asyncHandler( async (req, res) => {
    const email = req.body.email;
    const findSuperAdmin = await SuperAdmin.findOne({email : email})
    if (!findSuperAdmin) {
        const newSuperAdmin = await SuperAdmin.create(req.body)
        res.json(newSuperAdmin)
    } else {
        throw new Error("Invalid Credentials")
}
});

const login =  async ( req, res) => {
    const { email , password } = req.body
    const findSuperAdmin = await SuperAdmin.findOne({email : email})
    if (findSuperAdmin && (await findSuperAdmin.isPasswordMatched(password)) ) {
       // res.json("login successful")
       const refreshToken = await generateRefreshToken(findSuperAdmin?._id)  //add after,,for refreshtoken
        const updatedSuperAdmin = await SuperAdmin.findByIdAndUpdate(findSuperAdmin.id, {
            refreshToken : refreshToken
        },
        {new:true}
        );

        res.cookie("refreshToken", refreshToken, {
            httpOnly : true,
            maxAge : 72 * 60 * 60 * 1000
        })  //cookie-parser
        res.json({
            _id: findSuperAdmin?._id,
            name: findSuperAdmin?.name,
            email: findSuperAdmin?.email,
            mobile: findSuperAdmin?.mobile,
            password : findSuperAdmin?.password,

            token:generateToken(findSuperAdmin?._id)

        });
    } else {
        res.send("Invalid credentials")
    }}


// get all superAdmin

const getAllSuperAdmin = asyncHandler (async (req, res) => {
    try {
        const get = await SuperAdmin.find()
        res.send(get)
    } catch (error) {
        throw new Error(error)
    }
})

//get superAdmin by id

const getSuperAdmin = asyncHandler ( async ( req, res) => {
    const {id} = req.params
    try {
        const getI = await SuperAdmin.findById(id)
        res.send(getI)
    } catch (error) {
        throw new Error(error)
    }
})

// update a SuperAdmin

const updateSuperAdmin = asyncHandler( async ( req, res) => {
    const {id} = req.params
    try {
        const updated = await SuperAdmin.findByIdAndUpdate(id,
            {
                name : req?.body?.name,
                email : req?.body?.email,
                mobile : req?.body?.mobile,
                password : req?.body?.password,

            },
            { new : true})
            res.json(updated)
            
       
    } catch (error) {
        throw new Error(error)
    }
})

// delete by id

const deleteSuperAdmin  = asyncHandler( async ( req, res) => {
    const {id} = req.params
    try {
        const deleted = await SuperAdmin.findByIdAndDelete(id)
        res.json({message : "super admin deleted" , deleted})
        
    } catch (error) {
        throw new Error(error)
    }
})

// handle refreshtOKEN

const handleRefreshToken = asyncHandler ( async( req, res) => {
    const cookie = req.cookies
    console.log(cookie)

    if(!cookie?.refreshToken) 
    throw new Error ( "there is no refreshToken in cookies.")

    const refreshToken = cookie.refreshToken
    console.log(refreshToken)

    const superAdmin = await SuperAdmin.findOne( { refreshToken})
    if(!superAdmin)
    throw new Error( "not matched")
    //res.json(SuperAdmin)

    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || superAdmin.id !== decoded.id) {
            throw new Error ( "there is something wrong")
        }
       const accessToken = generateToken(SuperAdmin?._id) 
       res.json({accessToken})
    })
});

// password functionalities

// update password

const updatePassword = asyncHandler (async (req, res) => {
   
        const { id } = req.params
        const { password } = req.body
        
        
        const updatedSuperAdmin = await Intern.findById(id)
        if ( password && confirmPassword) {
            updatedSuperAdmin.password = password
            const newPassword = await updatedSuperAdmin.save()
            res.json(newPassword)           
        } else {
            res.json(SuperAdmin)
        }
          
 } );

 const logout = asyncHandler(async (req, res) => {
    const {email}=req.body;
    try {
        const superAdmin = await SuperAdmin.findOne({email})
        if(!superAdmin){return res.status(404).json({error:"SuperAdmin not found"})}
        // Assuming you are using a refresh token stored in a cookie
        const refreshToken = req.cookies.refreshToken;
  
        // Clear the refresh token on the server side
        await SuperAdmin.findOneAndUpdate(
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


module.exports = {
    signUp,
    login,
    getAllSuperAdmin,
    getSuperAdmin,
    updateSuperAdmin,
    deleteSuperAdmin,
    handleRefreshToken,
    updatePassword,
    logout
}