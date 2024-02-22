const express= require('express');
const { signUp, login, getAlumni, getAllAlumni, deleteAlumni, updateAlumni, updatePassword, handleRefreshToken, logout} = require('../controller/alumniCtrl');
const router = express.Router();


router.post('/signup',signUp);
router.post('/login',login);
router.post('/logout',logout);
router.get('/:id',getAlumni);
router.get('/',getAllAlumni);
router.put('/:id',updateAlumni);
router.put('/refresh',handleRefreshToken);
router.put('/:id',updatePassword);
router.delete('/:id',deleteAlumni);

module.exports = router