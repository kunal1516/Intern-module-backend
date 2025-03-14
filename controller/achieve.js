const Acheive = require("../models/achievementModel");
const asyncHandler = require("express-async-handler");
const fs = require("fs");

// adding achievement
const addAcheive = asyncHandler(async (req, res) => {
  try {
    const { title, description } = req.body;
    const url = req.protocol + "://" + req.get("host");

    const add = new Acheive({
      title,
      description,
      image: url + "/public/" + req.file.filename,
    });
    const finalAdd = await add.save();
    res.json(finalAdd);
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    console.error(error.message);
    res.json({
      success: false,
      message: "Internal server error",
    });
  }
});

// update
const updateAchieve = asyncHandler(async (req, res) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;
    const existingAcheive = await Acheive.findById(id);

    if (!existingAcheive) {
      res.json("Acheivement not found");
    }
    existingAcheive.title = title;
    existingAcheive.description = description;

    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      existingAcheive.image = url + "/public/" + req.file.filename;
    }
    const updatedAcheive = await existingAcheive.save();
    // res.json(updatedAcheive)
    res.status(200).json({
      success: true,
      message: "Achievement updated successfully",
      news: updatedAcheive,
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
      res.json("internal server error");
    }
  }
});

//get all acheievemnts
const getallAcheivement = asyncHandler(async (req, res) => {
  try {
    const getAcheive = await Acheive.find();
    return res.status(202).send(getAcheive);
  } catch (error) {
    throw new Error(error);
  }
});
// get a  single acheievement
const getAcheievement = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getAchieve = await Acheive.findById(id);
    return res.status(201).send({ getAchieve });
  } catch (error) {
    throw new Error(error);
  }
});

// delete a Acheive

const deleteAcheivement = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Acheive.findByIdAndDelete(id);
    res.json({
      success: true,
      message: "deleted succesfully!",
      Acheive: deleted,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//dashboard
const dashboard = asyncHandler(async (req, res) => {
  try {
    const totalAcheiveCount = await Acheive.countDocuments();
    res.send({ count: totalAcheiveCount });
  } catch (error) {
    // Handle errors
    console.error("Error getting sign-ups count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const pagination = asyncHandler(async (req,res)=> {
  try{
  const page = req.query.page;
  const limit = req.query.limit;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);
  if (req.query.page) {
    const acheiveCount = await Acheive.countDocuments();
    if (skip >= acheiveCount) throw new Error("This Page does not exists");
  }
  console.log(page, limit, skip);
  
  const acheive = await query;
  res.json(acheive);
  } catch (err){
    res.status(500).json({message:err.message});
  }
  });


  module.exports = {
  addAcheive,
  updateAchieve,
  getAcheievement,
  getallAcheivement,
  deleteAcheivement,
  dashboard,
  pagination
};
