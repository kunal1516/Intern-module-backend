const Gallery = require('../models/galleryModel')
const asyncHandler = require('express-async-handler')
const fs=require('fs')

const addImages = asyncHandler(async(req,res)=>{
    const{ title } = req.body;
    const url = req.protocol + "://" + req.get("host");
    try {
        const add = new Gallery({
            title,
            image: url + "/public/" + req.file.filename
        })
        const finalImage = await add.save();
        res.status(202).send(finalImage)
    } catch (error) {
        throw new Error(error)
    }

})

const getImages=asyncHandler(async(req,res)=>{
    const{id}=req.params;
    try {
        const getImage=await Gallery.findOne(id)
        res.status(202).send(getImage)
    } catch (error) {
        res.status(501).send("Internal server error")
    }
})

const getAllImages=asyncHandler(async(req,res)=>{
    try {
        const getAll=await Gallery.find()
        res.status(202).send(getAll)
    } catch (error) {
        res.status(501).send("Internal server error")
    }
}) 

const updateImages = asyncHandler(async (req, res) => {
    try {
      const { title } = req.body;
      const { id } = req.params;
      const existingImage = await Gallery.findById(id);
  
      if (!existingImage) {
        res.send("Image not found");
      }
      existingImage.title = title;

      if (req.file) {
        const url = req.protocol + "://" + req.get("host");
        existingImage.image = url + "/public/" + req.file.filename;
      }
      const updatedImage = await existingImage.save();
      // res.json(updatedEvent)
      res.status(200).send({
        success: true,
        message: "Image updated successfully",
        news: updatedImage,
      });
    } catch (error) {
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
        res.send("internal server error");
      }
    }
  });

const deleteImages = asyncHandler(async(req,res)=>{
    const {id}=req.params;
    try {
        const deleteImage = await Gallery.findByIdAndDelete(id)
        res.status(202).send({message:"Deleted Successfully",deleteImage});
    } catch (error) {
        res.status(501).send("Internal Server Error")
    }
})

const pagination = asyncHandler(async (req,res)=> {
  try{
  const page = req.query.page;
  const limit = req.query.limit;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);
  if (req.query.page) {
    const galleryCount = await Gallery.countDocuments();
    if (skip >= galleryCount) throw new Error("This Page does not exists");
  }
  console.log(page, limit, skip);
  
  const gallery = await query;
  res.json(gallery);
  } catch (err){
    res.status(500).json({message:err.message});
  }
  });

module.exports ={ addImages, updateImages,getImages,getAllImages,deleteImages,pagination};