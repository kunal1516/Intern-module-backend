const Intern = require('../models/InternModel')
const asyncHandler =  require('express-async-handler')
const bcrypt = require('bcrypt')
const { generateToken  } = require('../config/jwtToken')
const{  generateRefreshToken } = require("../config/refreshToken")
const jwt = require('jsonwebtoken');
const nodemailer=require('nodemailer');

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
        const updatedIntern = await Intern.findByIdAndUpdate(findIntern.id, {
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

const getAllIntern = asyncHandler (async (req, res) => {
    try {
        const get = await Intern.find()
        res.send(get)
    } catch (error) {
        throw new Error(error)
    }
})

//get intern by id

const getIntern = asyncHandler ( async ( req, res) => {
    const {id} = req.params
    try {
        const getI = await Intern.findById(id)
        res.send(getI)
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

// handle refreshtOKEN

const handleRefreshToken = asyncHandler ( async( req, res) => {
    const cookie = req.cookies
    console.log(cookie)

    if(!cookie?.refreshToken) 
    throw new Error ( "there is no refreshToken in cookies.")

    const refreshToken = cookie.refreshToken
    console.log(refreshToken)

    const intern = await Intern.findOne( { refreshToken})
    if(!intern)
    throw new Error( "not matched")
    //res.json(Intern)

    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || intern.id !== decoded.id) {
            throw new Error ( "there is something wrong")
        }
       const accessToken = generateToken(Intern?._id) 
       res.json({accessToken})
    })
});

// password functionalities

// update password

const updatePassword = asyncHandler (async (req, res) => {
   
        const { id } = req.params
        const { password , confirmPassword } = req.body
        
        
        const updatedIntern = await Intern.findById(id)
        if ( password && confirmPassword) {
            updatedIntern.password = password
            updatedIntern.confirmPassword = confirmPassword;
            const newPassword = await updatedIntern.save()
            res.json(newPassword)           
        } else {
            res.json(Intern)
        }
          
 } );

 //forgot password

 const forgotpassword= asyncHandler(async(req,res)=>{
    const { email } = req.body;
  
    try {
      // Check if the email exists in the database
      const intern = await Intern.findOne({ email });
  
      if (!intern) {
        return res.status(404).json({ error: "User not found." });
      }
  
      // Generate a unique reset link
      const resetLink = `http://localhost:4000/CreateNewPassword?email=${email}`;
  
      // Send the reset link via email
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "kunalshewale4444@gmail.com",
          pass: "wzabpocutyelpjzp",
        },
      });
  
      const mailOptions = {
        from: "kbtug21503@kbtcoe.org",
        to: email,
        subject: "Intern-module - Password Reset Link",
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
  const resetnewpassword= asyncHandler(async (req, res) => {
    const { email, newPassword } = req.body;
  
    try {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the password for the user with the provided email
      await Intern.findOneAndUpdate({ email }, { password: hashedPassword });
  
      res.status(200).json({ message: "Password reset successful." });
    } catch (error) {
      console.error("Error resetting password:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  //logout functionality
  /*const logout=asyncHandler(async(req,res)=>{
    const cookie=req.cookies;
    if(!cookie?.refreshToken)throw new Error("No refresh Token in Cookies");
    const refreshToken=cookie.refreshToken;
    const intern=await Intern.findOne({refreshToken});
    if(!intern){
        res.clearCookie("refreshToken",{
            httpOnly:true,
            secure:true,
        });
        return res.sendStatus(204);  //forbidden
    } 
    await Intern.findOneAndUpdate({ refreshToken: refreshToken }, {
        $set: { refreshToken: "" },
    });
    
    res.clearCookie("refreshToken",{
        httpOnly:true,
        secure:true,
    });    
    res.sendStatus(204);  //forbidden     
});*/

const logout = asyncHandler(async (req, res) => {
  const {email}=req.body;
  try {
      const intern=await Intern.findOne({email})
      if(!intern){return res.status(404).json({error:"Intern not found"})}
      // Assuming you are using a refresh token stored in a cookie
      const refreshToken = req.cookies.refreshToken;

      // Clear the refresh token on the server side
      await Intern.findOneAndUpdate(
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

//dashboard
const dashboard = asyncHandler( async (req, res) => {
    try {
        const totalInternCount = await Intern.countDocuments();
        res.send({ count: totalInternCount });
    } catch (error) {
        // Handle errors
        console.error("Error getting sign-ups count:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//Search Query
const search=asyncHandler( async (req, res) => {
    const internIdFromToken = req.id;
  
    try {
      const intern = await Intern.findById(internIdFromToken).select('fullName  collegeName');
  
      if (!intern) {
        return res.status(404).json({ error: "Intern not found" });
      }
  
      const { fullName, collegeName } = intern;
  
      const matchingInterns = await Intern.find({
        $and: [
          { $or: [{ fullName }, { collegeName }] },
          { _id: { $ne: internIdFromToken } }
        ]
      }).select('fullName collegeName');
  
      res.status(200).json(matchingInterns);
    } catch (error) {
      console.error("Error fetching matching interns:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

// token authorization
const getintern = asyncHandler(  async (req, res) => {

    try {
      const internId = req.intern.id;
      const intern = await Intern.findById(internId).select("-password")
      res.send(intern)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })

  // upload profile photo
const uploadProfilePhoto = asyncHandler(async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'No file selected!' });
        } else {
            res.status(200).json({ filename: req.file.filename });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//filtering


const filteringInterns = asyncHandler(async (req, res) => {
  const { selectField } = req.query;

  if (!selectField) {
    return res.status(400).json({ error: 'field query parameter is required' });
  }

  try {
    const filteredInterns = await Intern.find({ field: selectField });

    res.json(filteredInterns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//pagination

//pagination

const pagination = asyncHandler(async (req,res)=> {
  try{
  const page = req.query.page;
  const limit = req.query.limit;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);
  if (req.query.page) {
    const alumniCount = await Alumni.countDocuments();
    if (skip >= alumniCount) throw new Error("This Page does not exists");
  }
  console.log(page, limit, skip);
  
  const alumni = await query;
  res.json(alumni);
  } catch (err){
    res.status(500).json({message:err.message});
  }
  });




module.exports = {
    signUp,
    login,
    getAllIntern,
    getIntern,
    updateIntern,
    deleteIntern,
    handleRefreshToken,
    updatePassword,
    forgotpassword,
    resetpassword,
    resetnewpassword,
    logout,
    dashboard,
    search,
    getintern,
    uploadProfilePhoto,
    filteringInterns,
    pagination
}