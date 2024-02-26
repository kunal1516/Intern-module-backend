const express = require('express')
const {addEvent , getEvent , getallEvent, deleteEvent, updateEvent } = require('../controller/eventCntrl')
const router = express.Router()
const {saveEventImage} = require('../middleware/uploadImages')

router.post('/add' , saveEventImage, addEvent)

router.put("/:id" ,  saveEventImage, updateEvent)

router.get('/:id' , getEvent)

router.get('/' , getallEvent)

router.delete ('/:id' , deleteEvent)

module.exports = router