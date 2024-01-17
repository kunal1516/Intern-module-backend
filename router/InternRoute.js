const express = require('express')
const router = express.Router()

const { signUp, login, getAll, gets, updateIntern, deleteIntern, updatePassword } = require('../controller/internCntrl')


router.post('/signUp',signUp)

router.post('/login' , login)

router.get('/get' ,getAll)

router.get('/:id' , gets)

router.put('/update/:id', updateIntern)

router.put('/updatePassword/:id' ,updatePassword)

router.delete('/:id' ,deleteIntern)


module.exports = router