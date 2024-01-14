const express=requiure('express')
const router=express.Router;
// const register =require("../controller/userCtrl")
const User = require("../models/userModel")

router.post("/adduser",async(req,res)=>{
try {
    const newUser =await User.create(req.body);
    res.json(newUser);
} catch (error) {
    console.error(error.message);
    res.send(500).send("internal server error")
}
})
router.post('/register',register);