const express= require('express');
const { signUp, login, getAlumni, getAllAlumni, deleteAlumni, updateAlumni, updatePassword, handleRefreshToken, logout, forgotPasswordToken, resetPassword } = require('../controller/alumniCtrl');
const router = express.Router();


router.post('/signup',signUp);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token" , resetPassword);
router.post('/login',login);
router.get('/:id',getAlumni);
router.get('/',getAllAlumni);
router.put('/:id',updateAlumni);
router.put('/logout',logout);
router.put('/:id',updatePassword);
router.put('/',handleRefreshToken);
router.delete('/:id',deleteAlumni);

module.exports = router