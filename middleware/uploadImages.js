const multer = require('multer')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

//mult storage

const multerStorage =  multer.diskStorage({
    destination : function (req, file, cb) {
        cb( null , path.join(__dirname, '../public/images'))
    },
    filename : function( req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
        cb( null, file.fieldname + "-" + uniqueSuffix + ".jpeg")
    }
})

//mult filter 

const multerFilter = (req, file, cb) => {
    if( file.mimetype.startsWith("image")) {
        cb ( null, true)
    } 
    else {
        cb( { 
            message: "unsupported file format"
        },
        false)
    }
}

//upload

const uploadPhoto = multer ( {
    storage : multerStorage,
    fileFilter : multerFilter,
    limits : { fieldSize : 2000000}
})

module.exports = {
    uploadPhoto
}