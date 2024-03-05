///from sakshi kadave

 const jwt = require("jsonwebtoken");
 const Admin = require("../model/adminModel");
 const JWT_SECRET = process.env.JWT_SECRET;

 const fetchAdmin = async (req, res, next) => {
   const token = req.cookies.authToken
     ? req.cookies.authToken
     : req.get("authToken");
   if (!token) {
     return res.status(401).json({ error: "Invalid Token" });
   }
   try {
     const data = jwt.verify(token, JWT_SECRET);
     const admin = await Admin.findById(data.id);
     if (!admin) {
       return res.status(404).clearCookie(token).json("Admin Not Found");
     }
     req.admin = data.id;
     next();
   } catch (error) {
     if (error.name === "TokenExpiredError") {
       return res.status(419).json({ error: "Token has expired" });
     }
     console.log("Error with token: { " + error.message + " }");
     res.status(419).json({ error: error.message });
   }
 };

 module.exports = fetchAdmin;
