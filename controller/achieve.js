const Acheive = require('../models/achievementModel')
const asyncHandler = require('express-async-handler')
const fs = require('fs')


// adding achievement
const addAcheive = asyncHandler (async (req, res) => {
    
    try {
        const { title, description} = req.body
        const url = req.protocol + "://" + req.get("host")
   
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

//dashboard
const dashboard = asyncHandler( async (req, res) => {
    try {
        const totalAcheiveCount = await Acheive.countDocuments();
        res.json({ count: totalAcheiveCount });
    } catch (error) {
        // Handle errors
        console.error("Error getting sign-ups count:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
module.exports = {
 addAcheive , updateAchieve, getAcheievement, getallAcheivement, deleteAcheivement, dashboard
}