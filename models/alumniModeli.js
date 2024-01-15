const mongoose = require('mongoose');
const userSchema = require('./userModel')


var alumniSchema = new mongoose.Schema({
    current_Position : {
        type : String,
        require: true
    },
    working_Company : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    batch : {
        type : String,
        required : true
    },
   
})

const Alumni = userSchema.discriminator('Alumni', alumniSchema);
module.exports = Alumni