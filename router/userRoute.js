const express= require('express')
const router = express.Router();
const signUp = require("../controller/userCtrl")
const User = require("../models/userModel")


router.post('/signup',signUp);

//router.post('/login' , login)

module.exports = router