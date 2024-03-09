const express = require('express')
const { addAcheive, updateAchieve, getAcheievement, getallAcheivement, deleteAcheivement, dashboard , pagination } = require('../controller/achieve')
const { saveAcheiveImage } = require('../middleware/uploadImages');
const router = express.Router()


router.post('/add' , saveAcheiveImage , addAcheive)
router.put('/:id' , saveAcheiveImage, updateAchieve)
router.get('/:id' , getAcheievement)
router.get('/' , getallAcheivement)
router.get('/acheives/count',dashboard)
router.get('/page',pagination);
router.delete('/:id' , deleteAcheivement)


module.exports = router