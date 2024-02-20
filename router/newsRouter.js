const express = require('express')
const { createNews , getsNews , getNews, deleteNews } = require('../controller/newsCtrl')
const { addGallaryImages } = require('../middleware/uploadImages')
const router = express.Router()

router.post('/add' , addGallaryImages, createNews)

router.get('/' , getsNews)

router.get('/:id' , getNews)

router.delete( '/:id' , deleteNews)

module.exports = router