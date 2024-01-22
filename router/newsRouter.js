const express = require('express')
const createNews = require('../controller/newsCtrl')
const { saveNewsImage } = require('../middleware/uploadImages')
const router = express.Router()

router.post('/add' , saveNewsImage, createNews)



module.exports = router