
const Acheive = require('../models/achievementModel')
const asyncHandler = require('express-async-handler')
<<<<<<< HEAD
const fs = require('fs')
=======
const fs=require('fs')
>>>>>>> e282394c6c6d59bbe0497bd14f7370ec7ff395b4

// adding achievement

const addAcheive = asyncHandler (async (req, res) => {
    
    try {
        const { title, description} = req.body
<<<<<<< Updated upstream
        const url = req.protocol + "://" + req.get("host")
=======
    const url = req.protocol + "://" + req.get("host")
>>>>>>> Stashed changes
        const add = new Acheive ( {
            title, description,
            image  : url + "/public/" + req.file.filename, 
        })
        const finalAdd = await add.save()
        res.json(finalAdd)
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

// update 


const updateAchieve = asyncHandler ( async ( req, res) => {
    try {
        const { title, description} = req.body
        const { id } = req.params
        const existingAcheive = await Acheive.findById(id)

        if ( !existingAcheive) {
            res.json("Acheivement not found")
        }
        existingAcheive.title = title
        existingAcheive.description = description
<<<<<<< Updated upstream
=======
       
>>>>>>> Stashed changes

        if(req.file) {
             const url = req.protocol + "://" + req.get("host")
             existingAcheive.image = url + "/public/" + req.file.filename
        }
        const updatedAcheive = await existingAcheive.save()
       // res.json(updatedAcheive)
       res.status(200).json({
        success: true,
        message: "Achievement updated successfully",
        news: updatedAcheive,
    });
    } catch (error) {
        if( req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path)
            res.json("internal server error")
        }
    }
})

//get all acheievemnts

const getallAcheivement = asyncHandler(async (req, res) => {
    try {
        const gets = await Acheive.find()
        res.json(gets)
    } catch (error) {
        throw new Error(error)
    }
})
// get a  single acheievement
const getAcheievement = asyncHandler(async ( req, res) => {
    const { id } = req.params
    try {
        const get = await Acheive.findById( id ) 
        res.json(get)
    } catch (error) {
        throw new Error(error)
    }
})

// delete a Acheive 

const deleteAcheivement = asyncHandler ( async ( req, res) => {
    const {id} = req.params
    try {
        const deleted = await Acheive.findByIdAndDelete(id)
        res.json({
            success:true,
            message : "deleted succesfully!",
            Acheive :  deleted} )
    } catch (error) {
        throw new Error(error)
    }
})
module.exports = {
 addAcheive , updateAchieve, getAcheievement, getallAcheivement, deleteAcheivement
}