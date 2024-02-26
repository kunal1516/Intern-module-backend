const express = require('express')
const { createNews , getsNews , getNews, deleteNews, updateNews, dashboard } = require('../controller/newsCtrl')
const { savenewsImage } = require('../middleware/uploadImages')
const router = express.Router() 


router.post('/add' , savenewsImage, createNews)

router.put('/:id' , savenewsImage, updateNews)

router.get('/' , getsNews)

router.get('/:id' , getNews)

router.get('/newss/count',dashboard)

router.delete( '/:id' , deleteNews)

module.exports = router