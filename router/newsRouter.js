const express = require('express')
const { createNews , getsNews , getNews, deleteNews } = require('../controller/newsCtrl')
const { savenewsImage } = require('../middleware/uploadImages')
const router = express.Router()

router.post('/add' , savenewsImage, createNews)

router.get('/' , getsNews)

router.get('/:id' , getNews)

router.delete( '/:id' , deleteNews)

module.exports = router