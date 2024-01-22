const News = require('../models/newsModel')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const fs = require('fs')
const { saveNewsImage } = require('../middleware/uploadImages')
const { Console } = require('console')
// adding of news

const createNews = asyncHandler(async (req, res) => {
    try {
        const { image } = req.file;  // Destructuring the file object from the request
        const { title, description, date } = req.body; // Destructuring other fields from the request body
       
        // Creating a new instance of the News model with the provided data
        const newNews = new News({
            title,
            description,
            date,
            image,
        });


        // Saving the new news to the database
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


module.exports = 
    createNews