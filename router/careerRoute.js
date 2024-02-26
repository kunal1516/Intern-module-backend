const express = require('express' )
const { addCareer, updateCareer, getCareer, getAll, deleteCareer, dashboard } = require('../controller/career')
const router = express.Router()

router.post('/add' , addCareer)
router.put('/:id' , updateCareer)
router.get('/:id' , getCareer)
router.get('/' , getAll)
router.get('/careers/count',dashboard)
router.delete('/:id' , deleteCareer)

module.exports = router