/*const{default:mongoose}=require('mongoose');

const dbConnect=()=>{
    try {
      const conn =mongoose.connect("mongodb://127.0.0.1:27017/intern");
      console.log('Database connected successfully');  
    } catch (error) {
        console.log('Database error');
    }
};
module.exports=dbConnect;*/

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const mongoURI = "mongodb://127.0.0.1:27017/intern";



async function connectToMongo() {
  console.log("Connecting to Database ");
  try {
    let x = await mongoose.connect(mongoURI);
    console.log("Connected to Database: " + x.connections[0].name);
    return true;
  } catch (e) {
     console.log(e);
    return false;
  }
}

module.exports=connectToMongo