const express = require('express')
const router = express.Router()

const { signUp, login, getAll, gets, updateIntern, deleteIntern, updatePassword, handleRefreshToken } = require('../controller/internCntrl')


router.post('/signUp',signUp)

router.post('/login' , login)

router.get('/get' ,getAll)

router.get('/:id' , gets)

router.put('/update/:id', updateIntern)

router.put('/refresh' , handleRefreshToken)

router.put('/updatePassword/:id' ,updatePassword)


router.delete('/:id' ,deleteIntern)


module.exports = router