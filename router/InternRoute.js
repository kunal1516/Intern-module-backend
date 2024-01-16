const express = require('express')
const router = express.Router()

const signUp = require('../controller/internCntrl')


router.post('/signUp',signUp)


module.exports = router