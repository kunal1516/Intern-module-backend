const express = require('express')
const { addAcheive, updateAchieve, getAcheievement, getallAcheivement, deleteAcheivement } = require('../controller/achieve')
const router = express.Router()


router.post('/add' , addAcheive)
router.put('/:id' , updateAchieve)
router.get('/:id' , getAcheievement)
router.get('/' , getallAcheivement)
router.delete('/:id' , deleteAcheivement)


module.exports = router