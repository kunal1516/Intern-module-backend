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

const getAllCareer = asyncHandler (async (req, res) => {
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

//dashboard
const dashboard = asyncHandler( async (req, res) => {
    try {
        const totalCareerCount = await Career.countDocuments();
        res.json({ count: totalCareerCount });
    } catch (error) {
        // Handle errors
        console.error("Error getting sign-ups count:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = {
addCareer,
updateCareer,
getAllCareer,
getCareer,
deleteCareer,
dashboard
}