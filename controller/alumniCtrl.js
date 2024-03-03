const Alumni = require('../models/alumniModel');
const asyncHandler=require('express-async-handler');
const bcrypt = require('bcrypt')
const { generateToken  } = require('../config/jwtToken')
const{  generateRefreshToken } = require("../config/refreshToken")
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');

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

const handleRefreshToken = asyncHandler(async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(400).json({ error: "No refreshToken found in cookies." });
        }

        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        console.log("Decoded JWT:", decoded);

        const alumni = await Alumni.findOne({ refreshToken });
        console.log("Retrieved Alumni:", alumni);

        if (!alumni) {
            return res.status(400).json({ error: "Refresh token not matched with any user." });
        }

        if (String(alumni._id) !== decoded.id) {
            return res.status(400).json({ error: "Invalid refresh token: Alumni ID mismatch." });
        }

        const accessToken = generateToken(alumni._id);
        res.json({ accessToken });
    } catch (error) {
        console.error("Error handling refresh token:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

const updatePassword = asyncHandler (async (req, res) => {
   
    const { id } = req.params
    const { password , confirmPassword } = req.body
    
    
    const updatedAlumni = await Alumni.findById(id)
    if ( password && confirmPassword) {
        updatedAlumni.password = password
        updatedAlumni.confirmPassword = confirmPassword;
        const newPassword = await updatedAlumni.save()
        res.json(newPassword)           
    } else {
        res.json(Alumni)
    }
      
});

const logout = asyncHandler(async (req, res) => {
    const{email}=req.body;
    try {
        const alumni=await Alumni.findOne({email})
        if(!alumni){return
        res.status(404).json({error:"Alumni not found"})}
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

const forgotpassword= asyncHandler(async(req,res)=>{
    const { email } = req.body;
  
    try {
      // Check if the email exists in the database
      const alumni = await Alumni.findOne({ email });
  
      if (!alumni) {
        return res.status(404).json({ error: "User not found." });
      }
  
      // Generate a unique reset link
      const resetLink = `http://localhost:4000/CreateNewPassword?email=${email}`;
  
      // Send the reset link via email
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "snehasp2004@gmail.com",
          pass: "vkvqfhycugdxzphf",
        },
      });
  
      const mailOptions = {
        from: "kbtug21373@kbtcoe.org",
        to: email,
        subject: "EXP-Mart - Password Reset Link",
        html: `
          <p><strong>Dear user,</strong></p>
          <p>Click the following link to reset your password:</p>
          <p><a href="${resetLink}">Reset Password Link</a></p>
        `,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
  
        res
          .status(200)
          .json({ message: "Password reset link sent successfully." });
      });
    } catch (error) {
      console.error("Error resetting password:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });   

  //resetpassword default
  const resetpassword = asyncHandler( async (req, res) => {
    const { email } = req.query;
    res.render("resetpassword", { email });
  });
  
  // Route to update the password
  const resetnewpassword = asyncHandler(async (req, res) => {
    const { email, newPassword } = req.body;
  
    try {
        // Check if newPassword is provided
        if (!newPassword) {
            return res.status(400).json({ error: "New password is required" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
  
        // Update the password for the user with the provided email
        await Alumni.findOneAndUpdate({ email }, { $set: { password: hashedPassword } });
  
        res.status(200).json({ message: "Password reset successful." });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


//dashboard
const dashboard = asyncHandler( async (req, res) => {
    try {
        const totalSignUpsCount = await Alumni.countDocuments();
        res.json({ count: totalSignUpsCount });
    } catch (error) {
        // Handle errors
        console.error("Error getting sign-ups count:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// token authorization
const getalumni = asyncHandler(  async (req, res) => {

    try {
      const alumniId = req.alumni.id;
      const alumni = await Alumni.findById(alumniId).select("-password")
      res.send(alumni)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })
 

  // upload profile photo

  const uploadProfilePhoto = asyncHandler (async( req, res) => {
   try {
    if(!req.file)
    {
        res.json("no file selected")
    }else {
        res.json(req.file.filename)
    }
   } catch (error) {
    res.json(err.message)
   }
  })
module.exports= {signUp , login , getAlumni , getAllAlumni , deleteAlumni , updateAlumni , updatePassword , handleRefreshToken , logout , forgotpassword , resetpassword , resetnewpassword,dashboard, getalumni,
uploadProfilePhoto} 

