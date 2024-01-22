const multer = require("multer");
const { v4 } = require("uuid");
const { maxImageSize } = require("../config");

// Volunteer Image Storing Config
const NewsImageStorage = multer.diskStorage({
  filename: (req, file, cb) => {
      const fileName = "-" + file.originalname.toLowerCase().split(" ").join("-");
      cb(null, "News-" + v4() + fileName);
  },
  destination: (req, file, cb) => {
      cb(null, "./public/images");
  },
});

const saveNewsImage = multer({
  storage: NewsImageStorage,
  limits: { fileSize: maxImageSize },
  fileFilter: (req, file, cb) => {
      if (file.fieldname === "image" &&
          (file.mimetype === "application/msword" || file.mimetype === "application/pdf")) {
          cb(null, true);
      } else {
          cb(null, false);
      }
  },
}).single('image');

module.exports = {
  saveNewsImage,
};
