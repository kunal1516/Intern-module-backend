const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var newsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    
    },
    description :{
        type:String,
    
    },
    image : [],
    
    date:{
        day : Number,
        month : Number,
        year : Number
     
    },
});

//Export the model
module.exports = mongoose.model('News', newsSchema);