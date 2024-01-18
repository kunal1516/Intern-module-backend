const express= require('express');
const { signUp, login, getAlumni, getAllAlumni, deleteAlumni, updateAlumni } = require('../controller/alumniCtrl');
const router = express.Router();


router.post('/signup',signUp);
router.post('/login',login);
router.get('/:id',getAlumni);
router.get('/',getAllAlumni);
router.delete('/:id',deleteAlumni);
router.put('/:id',updateAlumni);
module.exports = router