const multer = require("multer");
const { v4 } = require("uuid");
const { maxImageSize } = require("../config");
const path = require('path')

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
      file.mimetype === "image/jpg" || 
      file.mimetype === "image/jpeg" ||
      
      file.mimetype === "application/pdf"
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



// for uploading profile image of intern

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize multer upload
const uploadProfile = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
  fileFilter: function(req, file, cb) {
      checkFileType(file, cb);
  }
}).single('profilePhoto'); // 'profilePhoto' is the name of the file input field in your form

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
      return cb(null, true);
  } else {
      cb('Error: Only images (jpeg, jpg, png) are allowed!');
  }
}

//for Gallery
const GalleryImageStorage = multer.diskStorage({
  filename: (req, file, cb) => {
    const fileName = "-" + file.originalname.toLowerCase().split(" ").join("-");
    cb(null, "news-" + v4() + fileName);
  },
  destination: (req, file, cb) => {
    cb(null, "public");
  },
});
const saveGalleryImage = multer ( {
  storage : GalleryImageStorage,
  limits : { fleSize : maxImageSize },
  fileFilter : ( req, file, cb) => {
    if( 
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" || 
      file.mimetype === "image/jpeg" ||
      
      file.mimetype === "application/pdf"
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
saveAcheiveImage,
uploadProfile,
saveGalleryImage

}