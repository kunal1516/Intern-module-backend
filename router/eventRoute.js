const express = require('express')
const addEvent = require('../controller/eventCntrl')
const router = express.Router()

router.post('/add' , addEvent)

module.exports = router