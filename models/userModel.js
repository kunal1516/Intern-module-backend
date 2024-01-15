const mongoose = require('mongoose'); // Erase if already required


// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    contactNo : {
        type: Number,
        required : true
    },
    appearingAs : {
        type : String,
        enum : [ 'Alumni', 'Intern'],
        required : true
    }

});

    
//Export the model
module.exports = mongoose.model('User', userSchema);