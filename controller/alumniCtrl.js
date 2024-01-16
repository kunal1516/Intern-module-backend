const Alumni = require('../models/alumniModeli');
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
})
module.exports= {signUp}