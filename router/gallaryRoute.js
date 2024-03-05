const express = require("express");
const { addImages, updateImages, getImages, getAllImages, deleteImages } = require("../controller/gallaryCntrl");
const { saveGalleryImage } = require("../middleware/uploadImages");
const router = express.Router();

router.post('/add',saveGalleryImage,addImages)
router.put('/:id',saveGalleryImage,updateImages)
router.get('/:id',getImages)
router.get('/',getAllImages)
router.delete('/:id',deleteImages)

module.exports = router