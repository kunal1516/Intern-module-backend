const express = require('express')
const router = express.Router()

const { signUp, login, getAll, gets, updateIntern, deleteIntern, updatePassword, handleRefreshToken,resetnewpassword, resetpassword, forgotpassword,logout} = require('../controller/internCntrl')
const {internMiddleware,isAdmin}=require('../middleware/internMiddleware')

router.post('/signUp',signUp)

router.post('/login' ,login)

router.post('/forgot-password-token',forgotpassword)

router.post('/logout',logout)

router.get('/get' ,getAll)

router.get('/:id' , gets)

router.get('/reset-password',resetpassword)

router.put('/update/:id', updateIntern)

router.put('/refresh' , handleRefreshToken)

router.put('/updatePassword/:id' ,updatePassword)

router.post('/reset-password-token',resetnewpassword)

router.delete('/:id' ,deleteIntern)


module.exports = router