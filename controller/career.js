const Career = require('../models/careerModel')
const asyncHandler = require('express-async-handler')

// adding career 

const addCareer = asyncHandler(async (req, res) => {
    try {
        const { positionName, location, type, lastDate, description} = req.body
        const add = new Career ({
            positionName, location, type, lastDate, description
        }) 
        const finalCareer = await add.save()
        res.json({
            message: "career added succefully!",
            career : finalCareer
        })
    } catch (error) {
        throw new Error(error)
    }
})

// update Career

const updateCareer = asyncHandler (async (req, res) => {
    const {id} = req.params 
    const { positionName, location, type, lastDate, description} = req.body
    try {
        const updated = await Career.findByIdAndUpdate(id, {
            positionName, location, type, lastDate, description
        }) 
        const finalupdate = await updated.save()
        res.json(finalupdate)
        res.json(updated)
    } catch (error) {
        throw new Error(error)
    }
})

// get all carrers

const getAll = asyncHandler (async (req, res) => {
    try {
        const gets = await Career.find()
        res.json(gets)
    } catch (error) {
        throw new Error(error)
    }
})

// get a single career 
 
const getCareer = asyncHandler (async ( req, res) =>{
    const {id} = req.params
    try {
        const get = await Career.findById(id)
        res.json(get)

    } catch (error) {
        throw new Error(error)
    }
})

// delete a career

const deleteCareer = asyncHandler (async (req, res) => {
    const {id} = req.params
    try {
        const deleted = await Career.findByIdAndDelete(id)
        res.json(deleted)
    } catch (error) {
        throw new Error(error)
    }
})
module.exports = {
addCareer,
updateCareer,
getAll,
getCareer,
deleteCareer
}