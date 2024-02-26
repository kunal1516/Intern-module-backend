const express = require('express') 
const { addContact, updateContact, getContact, getallContact, deleteContact } = require('../controller/contact')
const router = express.Router()

router.post('/add' , addContact)
router.put('/:id' ,updateContact)
router.get('/:id' , getContact)
router.get('/' , getallContact)
router.delete('/delete' , deleteContact)
module.exports = router