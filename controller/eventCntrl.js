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
//get all events

const getallEvent = asyncHandler(async (req, res) => {
    try {
        const gets = await Event.find()
        res.json(gets)
    } catch (error) {
        throw new Error(error)
    }
})
// get a  single event
const getEvent = asyncHandler(async ( req, res) => {
    const { id } = req.params
    try {
        const get = await Event.findById( id ) 
        res.json(get)
    } catch (error) {
        throw new Error(error)
    }
})

// delete a event 

const deleteEvent = asyncHandler ( async ( req, res) => {
    const {id} = req.params
    try {
        const deleted = await Event.findByIdAndDelete(id)
        res.json({
            success:true,
            message : "deleted succesfully!",
            event :  deleted} )
    } catch (error) {
        throw new Error(error)
    }
})

// update an event

const updateEvent = asyncHandler ( async ( req, res) => {
    try {
        const { title, description, startDate, endDate, location } = req.body
        const { id } = req.params
        const existingEvent = await Event.findById(id)

        if ( !existingEvent) {
            res.json("Event not found")
        }
        existingEvent.title = title
        existingEvent.description = description
        existingEvent.startDate = startDate
        existingEvent.endDate = endDate
        existingEvent.location = location

        if(req.file) {
             const url = req.protocol + "://" + req.get("host")
             existingEvent.image = url + "/public/" + req.file.filename
        }
        const updatedEvent = await existingEvent.save()
       // res.json(updatedEvent)
       res.status(200).json({
        success: true,
        message: "Event updated successfully",
        news: updatedEvent,
    });
    } catch (error) {
        if( req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path)
            res.json("internal server error")
        }
    }
})

module.exports =  {
    addEvent,
    getEvent,
    getallEvent,
    deleteEvent,
    updateEvent
}