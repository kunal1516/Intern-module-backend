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

// const mongoURI = "mongodb://snehasp2004:MO3CiXny1C2t2KyX@ac-kabtcsg-shard-00-00.yeaos4l.mongodb.net:27017,ac-kabtcsg-shard-00-01.yeaos4l.mongodb.net:27017,ac-kabtcsg-shard-00-02.yeaos4l.mongodb.net:27017/internssl=true&replicaSet=atlas-q4279m-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

const mongoURI = "mongodb://snehasp2004:OWIt36iJaxJHqHbk@ac-c31y8ms-shard-00-00.ie87nv4.mongodb.net:27017,ac-c31y8ms-shard-00-01.ie87nv4.mongodb.net:27017,ac-c31y8ms-shard-00-02.ie87nv4.mongodb.net:27017/internmodule?ssl=true&replicaSet=atlas-11oplc-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
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

module.exports = connectToMongo;
