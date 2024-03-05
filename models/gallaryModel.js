///title, photo ,date and time stamps
//add alumi + intern ---admin

const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var gallarySchema = new mongoose.Schema({
    title:{
        type:String,
    },
    image:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
},
{
    timestamps:true,
}
);

//Export the model
module.exports = mongoose.model('Gallary', gallarySchema);