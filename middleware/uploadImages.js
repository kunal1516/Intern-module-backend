const multer = require("multer");
const { v4 } = require("uuid");
const { maxImageSize } = require("../config");

//for newsCntrl

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

// for eventCntrl
const eventImageStorage = multer.diskStorage({
  filename: (req, file, cb) => {
    const fileName = "-" + file.originalname.toLowerCase().split(" ").join("-");
    cb(null, "news-" + v4() + fileName);
  },
  destination: (req, file, cb) => {
    cb(null, "public");
  },
});
const saveEventImage = multer ( {
  storage : eventImageStorage,
  limits : { fleSize : maxImageSize },
  fileFilter : ( req, file, cb) => {
    if( 
      file.mimetype === "image/png" ||
      file.mimetype === "image/jprg" || 
      file.mimetype === "image/jpeg"
    ) { cb ( null, true)}
    else {
      cb( null , false);
      return null
    }
  }
}).single("image")

//for teamCtrl
const teamImageStorage = multer.diskStorage({
  filename: (req, file, cb) => {
    const fileName = "-" + file.originalname.toLowerCase().split(" ").join("-");
    cb(null, "news-" + v4() + fileName);
  },
  destination: (req, file, cb) => {
    cb(null, "public");
  },
});
const saveTeamImage = multer ( {
  storage : teamImageStorage,
  limits : { fleSize : maxImageSize },
  fileFilter : ( req, file, cb) => {
    if( 
      file.mimetype === "image/png" ||
      file.mimetype === "image/jprg" || 
      file.mimetype === "image/jpeg" ||
      //file.mimetype === "pdf/pdf"
    ) { cb ( null, true)}
    else {
      cb( null , false);
      return null
    }
  }
}).single("image")


//for AcheiveCtrl
const acheiveImageStorage = multer.diskStorage({
  filename: (req, file, cb) => {
    const fileName = "-" + file.originalname.toLowerCase().split(" ").join("-");
    cb(null, "news-" + v4() + fileName);
  },
  destination: (req, file, cb) => {
    cb(null, "public");
  },
});
const saveAcheiveImage = multer ( {
  storage : acheiveImageStorage,
  limits : { fleSize : maxImageSize },
  fileFilter : ( req, file, cb) => {
    if( 
      file.mimetype === "image/png" ||
      file.mimetype === "image/jprg" || 
      file.mimetype === "image/jpeg" 

    ) { cb ( null, true)}
    else {
      cb( null , false);
      return null
    }
  }
}).single("image")
module.exports = {
savenewsImage,
saveEventImage,
saveTeamImage,
saveAcheiveImage
}