const express = require('express' )
const { addCareer, updateCareer, getCareer, getAllCareer, deleteCareer, dashboard , pagination} = require('../controller/career')
const router = express.Router()

router.post('/add' , addCareer)
router.put('/:id' , updateCareer)
router.get('/:id' , getCareer)
router.get('/' , getAllCareer)
router.get('/careers/count',dashboard)
router.get('/page', pagination);
router.delete('/:id' , deleteCareer)

module.exports = router