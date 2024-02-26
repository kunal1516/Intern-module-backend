const express= require('express');
const { signUp, login, getAlumni, getAllAlumni, deleteAlumni, updateAlumni,logout,forgotpassword,resetnewpassword,dashboard } = require('../controller/alumniCtrl');
const router = express.Router();
const Alumni = require("../models/alumniModel")


router.post('/signup',signUp);
router.post('/login',login);
router.post('/logout',logout);
router.post('/forgot-password-token',forgotpassword);
router.post('/reset-password-token', resetnewpassword);
router.get('/:id',getAlumni);
router.get('/',getAllAlumni);
///http://localhost:4000/api/alumni/signups/count
router.get('/signups/count',dashboard);

router.delete('/:id',deleteAlumni);
router.put('/:id',updateAlumni);

module.exports = router