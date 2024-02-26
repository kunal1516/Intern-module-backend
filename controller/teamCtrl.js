const Team=require('../models/teamModel')
const asyncHandler=require('express-async-handler')
const fs=require('fs')

//addTeam
const addTeam = asyncHandler(async(req,res)=>{
try{
    const{name,position,description}=req.body;
    const url=req.protocol + "://" + req.get("host")
    const newTeam=new Team({
        name,
        position,
        description,
        image:url+"/public"+req.file.filename,
    })
    const finalTeam=await newTeam.save();
    res.status(200).json({
        success: true,
        message: "Team added successfully",
        event: finalTeam,});
    }
    catch(error){
        if( req.file && fs.existsSync(req.file.path)) {
             fs.unlinkSync(req.file.path)
        }
        console.error(error.message)
        res.json({
            success:false,
            message:"Internal Server Error"
        })
    }
    })

//getTeam by id
const getTeam=asyncHandler(async(req,res)=>{
    const {id}=req.params
    try {
        const get=await Team.findById(id)
        res.json(get)
    } catch (error) {
        throw new Error(error)
    }
})

//getall
const getAll=asyncHandler(async(req,res)=>{
    try {
        const get=await Team.find()
        res.json(get)
    } catch (error) {
        throw new Error(error)
    }
})

//deleteTeam
const deleteTeam=asyncHandler(async(req,res)=>{
    const{id}=req.params
    try {
        const deleted=await Team.findByIdAndDelete(id)
        res.json({message:"Team Deleted",deleted})
    } catch (error) {
        throw newError(error)
    }
})

//update a team
const updateTeam = asyncHandler(async (req, res) => {
    try {
        const { name, description, position } = req.body;
        const { id } = req.params; 
        
        // Check if the news exists
        const existingTeam = await Team.findById(id);
        if (!existingTeam) {
            return res.status(404).json({
                success: false,
                message: "Team not found",
            });
        }
        
        // Update the news with the provided data
        existingTeam.name = name;
        existingTeam.description = description;
        existingTeam.position = position;

        // Check if an image file is uploaded
        if (req.file) {
            const url = req.protocol + "://" + req.get("host");
            existingTeam.image = url + "/public/" + req.file.filename;
        }

        // Save the updated news to the database
        const updatedTeam = await existingTeam.save();

        // Sending a successful response with the updated news details
        res.status(200).json({
            success: true,
            message: "Team updated successfully",
            news: updatedTeam,
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
module.exports={
    addTeam,
    getTeam,
    getAll,
    deleteTeam,
    updateTeam
}