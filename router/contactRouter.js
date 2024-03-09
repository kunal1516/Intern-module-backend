const express = require('express') 
const { addContact, updateContact, getContact, getallContact, deleteContact, dashboard , pagination} = require('../controller/contact')
const router = express.Router()

router.post('/add' , addContact)
router.put('/:id' ,updateContact)
router.get('/:id' , getContact)
router.get('/' , getallContact)
router.get('/contacts/count',dashboard)
router.get('/page',pagination);
router.delete('/delete' , deleteContact)
module.exports = router