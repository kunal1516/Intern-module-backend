const express = require('express')
const {addEvent , getEvent } = require('../controller/eventCntrl')
const router = express.Router()
const {saveEventImage} = require('../middleware/uploadImages')

router.post('/add' , saveEventImage, addEvent)

router.get('/:id' , getEvent)
module.exports = router