const mongoose = require('mongoose');


var alumniSchema = new mongoose.Schema({
    
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
    password : {
        type : String,
        required : true,
        unique : true,
        minlength : 6
    },
    confirmPassword: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                // Custom validation to check if confirmPassword matches password
                return value === this.password;
            },
            message: 'Passwords do not match',
        }  }

   
})

module.exports = mongoose.model('alumni', alumniSchema);