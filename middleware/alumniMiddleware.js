const Alumni = require("../models/alumniModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const alumniMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const alumni = await Alumni.findById(decoded?.id);
        req.alumni = alumni;
        next();
      }
    } catch (error) {
      throw new Error("Not authorized token expired , PLease Login again");
    }
  } else {
    throw new Error("There is no token attached to header");
  }
});

//new middleware

const isAdmin = asyncHandler(async (req, res, next) => {
  console.log(req.alumni);
  const { email } = req.alumni;
  const adminAlumni = await Alumni.findOne({ email });
  if (adminAlumni.role !== "admin") {
    throw new Error("You are not an admin");
  } else {
    next();
  }
});

module.exports = { alumniMiddleware, isAdmin };

///from sakshi kadave

// const jwt = require("jsonwebtoken");
// const Admin = require("../model/adminModel");
// const JWT_SECRET = process.env.JWT_SECRET;

// const fetchAdmin = async (req, res, next) => {
//   const token = req.cookies.authToken
//     ? req.cookies.authToken
//     : req.get("authToken");
//   if (!token) {
//     return res.status(401).json({ error: "Invalid Token" });
//   }
//   try {
//     const data = jwt.verify(token, JWT_SECRET);
//     const admin = await Admin.findById(data.id);
//     if (!admin) {
//       return res.status(404).clearCookie(token).json("Admin Not Found");
//     }
//     req.admin = data.id;
//     next();
//   } catch (error) {
//     if (error.name === "TokenExpiredError") {
//       return res.status(419).json({ error: "Token has expired" });
//     }
//     console.log("Error with token: { " + error.message + " }");
//     res.status(419).json({ error: error.message });
//   }
// };

// module.exports = fetchAdmin;
