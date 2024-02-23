const News = require('../models/newsModel')
const asyncHandler = require('express-async-handler')
const fs = require('fs')
//const { saveNewsImage } = require('../middleware/uploadImages')
const path = require("path");
// adding of news

const createNews = asyncHandler(async (req, res) => {
    try {
        const { title, description, date } = req.body; 
       const url= req.protocol + "://" + req.get("host")
        // Creating a new instance of the News model with the provided data
        const newNews = new News({
            title,
            description,
            date,
            image: url+ "/public/" + req.file.filename,
       
    })
        //Saving the new news to the database
        const finalNews = await newNews.save();
        console.log('Image Data:', req.file);

        // Sending a successful response with the newly created news details
        res.status(200).json({
            success: true,
            message: "News added successfully",
            news: finalNews,
        });
    } catch (error) {
        // Handling errors
        if (req.file && fs.existsSync(req.file.path)) {
            // Deleting the uploaded file if an error occurs
            fs.unlinkSync(req.file.path);
        }

        console.error(error.message);

        // Sending an error response
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

// get all news

const getsNews = asyncHandler(async (req, res) => {
    try {
        const gets = await News.find()
        res.json(gets)
    } catch (error) {
        throw new Error(error)
    }
})

// get a single news

const getNews  = asyncHandler(async ( req, res) => {
    const { id } = req.params
    try {
        const get = await News.findById(id)
        res.json(get)
    } catch (error) {
        throw new Error(error)
    }
})

// delete News

const deleteNews = asyncHandler(async( req, res) => {
    const { id } = req.params
    try {
       const deleted = await News.findByIdAndDelete(id)
       res.json(deleted) 
    } catch (error) {
        throw new Error(error)
    }
})

// update news
/*
const updateNews = asyncHandler (async (req, res) => {
    
    const {id} = req.params
    console.log('Request Body:', req.body);
    try {
        const updatedNew = await News.findByIdAndUpdate(id, 
            {
                title: req?.body?.title,
                description: req?.body?.description,
                date : req?.body?.date,
                //image: req?.body?.image
            }, {new:true} )
            
            res.json(updatedNew)
    } catch (error) {
        throw new Error(error)
    }
})
*/

// const updateNews = asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     console.log('Request Body:', req.body);
//     try {
//         const updateFields = {
//             title: req.body.title,
//             description: req.body.description,
//             date: req.body.date,
//         };

//         // Check if req.body.image exists before assigning
//         if (req.body.image) {
//             updateFields.image = req.body.image;
//         }

//         const updatedNew = await News.findByIdAndUpdate(
//             id,
//             updateFields,
//             { new: true }
//         );

//         res.json(updatedNew);
//         console.log('Updated News:', updatedNew);  //doesnt update a image
//     } catch (error) {
//         throw new Error(error);
//     }
// });

const updateNews = asyncHandler(async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const { id } = req.params; 
        
        // Check if the news exists
        const existingNews = await News.findById(id);
        if (!existingNews) {
            return res.status(404).json({
                success: false,
                message: "News not found",
            });
        }
        
        // Update the news with the provided data
        existingNews.title = title;
        existingNews.description = description;
        existingNews.date = date;

        // Check if an image file is uploaded
        if (req.file) {
            const url = req.protocol + "://" + req.get("host");
            existingNews.image = url + "/public/" + req.file.filename;
        }

        // Save the updated news to the database
        const updatedNews = await existingNews.save();

        // Sending a successful response with the updated news details
        res.status(200).json({
            success: true,
            message: "News updated successfully",
            news: updatedNews,
        });
    } catch (error) {
        // Handling errors
        if (req.file && fs.existsSync(req.file.path)) {
            // Deleting the uploaded file if an error occurs
            fs.unlinkSync(req.file.path);
        }

        console.error(error.message);

        // Sending an error response
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});


module.exports = {
    createNews,
    getsNews,
    getNews,
    deleteNews,
    updateNews
}
