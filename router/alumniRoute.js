const express= require('express');
const { signUp, login, getAlumni, getAllAlumni, deleteAlumni, updateAlumni, updatePassword, handleRefreshToken, logout } = require('../controller/alumniCtrl');
const router = express.Router();


router.post('/signup',signUp);
router.post('/login',login);
router.get('/:id',getAlumni);
router.get('/',getAllAlumni);
router.put('/:id',updateAlumni);
router.put('/logout',logout);
router.put('/:id',updatePassword);
router.put('/',handleRefreshToken);
router.delete('/:id',deleteAlumni);

module.exports = router