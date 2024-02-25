const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var eventSchema = new mongoose.Schema({
  
    title:{
        type:String,
        required:true,
       
    },
    description:{
        type:String,
        required:true,
        
    },
    image: {
        type:String,
        required : true
    },
    startDate:{
        type:Date,
        required:true,
    },
    endDate:{
        type:Date,
        required:true,
    },
    location:{
        type: String,
        required:true,
    },
});

//Export the model
module.exports = mongoose.model('Event', eventSchema);