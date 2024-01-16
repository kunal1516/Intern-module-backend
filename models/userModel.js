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

});

    
//Export the model
module.exports = mongoose.model('User', userSchema);

///separate it
