const Gallary = require("../models/gallary");
const asyncHandler = require("express-async-handler");

const moment = require("moment");
// const { cloudinaryUploadImg } = require("../utils/cloudinary");
const fs = require("fs");
const path = require("path");
// const useGallary = require("../models/gallary");
const addGallaryImages = asyncHandler(async (req, res) => {
  try {
    const { title, images } = req.body;

    const date = moment(new Date()).format("YYYY-MM-DD");
    const gallery = new Gallary({
      title,
      images: "/public/images/" + req.file.filename,
      date,
    });
    const saveGallery = await gallery.save();
    res.json(saveGallery);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllGallaryImg = asyncHandler(async (req, res) => {
  try {
    const getGallaryImg = await Gallary.find();
    res.status(201).send(getGallaryImg);
  } catch (error) {
    throw new Error(error);
  }
});

const updateGallaryImg = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;
  const { title } = req.body;

  if (!title || !filename) {
    return res.status(401).json({ status: 401, message: "Fill out all data" });
  }

  try {
    const galleryData = await Gallary.findById(id);
    if (!galleryData) {
      return res
        .status(404)
        .json({ status: 404, message: "Gallery not found" });
    }

    galleryData.title = title;
    galleryData.images = filename;

    const updatedGalleryData = await galleryData.save();
    res.status(200).json(updatedGalleryData);
  } catch (error) {
    console.error("Error in updateGalleryImages:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

const deleteGallaryImg = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteGallaryImg = await Gallary.findByIdAndDelete(id);
    res.send(deleteGallaryImg);
  } catch (error) {
    throw new Error(error);
  }
});

const getaGallaryImg = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getagallaryimg = await Gallary.findById(id);
    res.send(getagallaryimg);
  } catch (error) {
    throw new Error(error);
  }
});

// const uploadImages = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongoDbId(id);

//   try {
//     const uploader = (path) => cloudinaryUploadImg(path);
//     const urls = [];
//     const files = req.files;

//     for (const file of files) {
//       const { path } = file;
//       const newpath = await uploader(path);
//       console.log(newpath);
//       urls.push(newpath);
//       fs.unlinkSync(path);
//     }

//     const findGallary = await Gallary.findByIdAndUpdate(
//       id,
//       {
//         images: urls.map((file) => file),
//       },
//       {
//         new: true,
//       }
//     );

//     res.json(findGallary);
//   } catch (error) {
//     throw new Error(error);
//   }
// });
module.exports = {
  addGallaryImages,
  getAllGallaryImg,
  updateGallaryImg,
  deleteGallaryImg,
  getaGallaryImg,
}