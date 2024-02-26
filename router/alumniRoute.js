const express= require('express');
const { signUp, login, getAlumni, getAllAlumni, deleteAlumni, updateAlumni, dashboard } = require('../controller/alumniCtrl');
const router = express.Router();
const Alumni = require("../models/alumniModel")


router.post('/signup',signUp);
router.post('/login',login);
router.get('/:id',getAlumni);
router.get('/',getAllAlumni);
///http://localhost:4000/api/alumni/signups/count
router.get('/signups/count',dashboard);

router.delete('/:id',deleteAlumni);
router.put('/:id',updateAlumni);

module.exports = router