const express = require('express')
const { addAdminIntern, updateAdminIntern, getAdminIntern, getAllAdminInterns, deleteAdminIntern } = require('../controller/adminInternCntrl')

const router = express.Router()

router.post('/add' , addAdminIntern)

router.put('/:id' , updateAdminIntern)

router.get('/:id', getAdminIntern)

router.get('/getAll', getAllAdminInterns)

router.delete('/:id' ,deleteAdminIntern)


module.exports = router