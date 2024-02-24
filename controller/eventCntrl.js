const Event = require('../models/eventModel')
const asyncHandler = require('express-async-handler')
const fs = require('fs')



const addEvent = asyncHandler (async (req, res) => {
    try {
        const { title, description, startDate, endDate, location} = req.body
        const url = req.protocol + "://" + req.get("host")
        const newEvent = new Event({
            title,
            description,
            startDate,
            endDate,
            location,
            image : url + "/public/" + req.file.filename,
        })
        const finalEvent = await newEvent.save()
        res.status(200).json({
            success: true,
            message: "Event added successfully",
            event: finalEvent,
        });
    } catch (error) {
        if( req.file && fs.existsSync(req.file.path)) {
             fs.unlinkSync(req.file.path)
        }
        console.error(error.message)
        res.json({
            success:false,
            message : "Internal server error"

        }
        )
    }

})

const getEvent = asyncHandler(async ( req, res) => {
    const {id} = req.params
    try {
        const get = await Event.findById(id) 
        res.json(get)
    } catch (error) {
        throw new Error(error)
    }
})

module.exports =  {
    addEvent,
    getEvent
}