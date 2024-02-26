const express = require('express' )
const { addCareer, updateCareer, getCareer, getAll, deleteCareer } = require('../controller/career')
const router = express.Router()

router.post('/add' , addCareer)
router.put('/:id' , updateCareer)
router.get('/:id' , getCareer)
router.get('/' , getAll)
router.delete('/:id' , deleteCareer)

module.exports = router