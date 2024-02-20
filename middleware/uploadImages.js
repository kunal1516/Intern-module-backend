const multer = require("multer");
const { v4 } = require("uuid");
const { maxImageSize } = require("../config");

//Slider Image Storing Config
const newsImageStorage = multer.diskStorage({
  filename: (req, file, cb) => {
    const fileName = "-" + file.originalname.toLowerCase().split(" ").join("-");
    cb(null, "news-" + v4() + fileName);
  },
  destination: (req, file, cb) => {
    cb(null, "public");
  },
});

const savenewsImage = multer({
  storage: newsImageStorage,
  limits: { fileSize: maxImageSize },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return null;
    }
  },
}).single("image");


module.exports = {
savenewsImage
}