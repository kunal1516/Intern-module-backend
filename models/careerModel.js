const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var careerSchema = new mongoose.Schema({
    positionName:{
        type:String,
        required:true,
    },
    location : {
        type: String,
        required : true,
    },
    type:{
        type:String,
        required:true,
    },
    lastDate:{
        type:Date,
        required:true,
    },
    description:{
        type:String,
    },
},
{
    timestamps:true,
}
);

//Export the model
module.exports = mongoose.model('Career', careerSchema);