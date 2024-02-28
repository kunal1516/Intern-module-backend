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
        res.json({ count: totalInternCount });
    } catch (error) {
        // Handle errors
        console.error("Error getting sign-ups count:", error);
        res.status(500).json({ error: "Internal server error" });
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
  

/*const uploadProfilePhoto = asyncHandler(async (req, res) => {
    try {
        
       const url= req.protocol + "://" + req.get("host")
        // Creating a new instance of the News model with the provided data
        const newUpload = new Intern({
           
            image: url+ "/public/" + req.file.filename,
       
    })
        //Saving the new news to the database
        const finalUpload = await newUpload.save();
        console.log('Image Data:', req.file);

        // Sending a successful response with the newly created news details
        res.status(200).json({
            success: true,
            message: "Profile photo added successfully",
            news: finalNews,
        });
    } catch (error) {
        // Handling errors
        if (req.file && fs.existsSync(req.file.path)) {
            // Deleting the uploaded file if an error occurs
            fs.unlinkSync(req.file.path);
        }

        console.error(error.message);

        // Sending an error response
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
*/
module.exports = {
    signUp,
    login,
    getAll,
    gets,
    updateIntern,
    deleteIntern,
    handleRefreshToken,
    updatePassword,
    forgotpassword,
    resetpassword,
    resetnewpassword,
    logout,
    dashboard,
    getintern,
    uploadProfilePhoto
}