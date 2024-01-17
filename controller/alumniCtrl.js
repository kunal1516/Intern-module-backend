const Alumni = require('../models/alumniModel');
const asyncHandler=require('express-async-handler')
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
    const findAlumni = await alumni.findOne({email});
    if(findAlumni && await findAlumni.isPasswordMatched(password)){
        const refreshToken = await generateRefreshToken(findAlumni?._id);
        const updatealumni = await alumni.findByIdAndUpdate(
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
            mobile:findAlumni?.mobile,
            token:generateToken(findAlumni?._id)
        });
    }else {
        throw new Error("Invalid Credentials");
    }
});

module.exports= {signUp , login} 