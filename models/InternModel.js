const mongoose = require('mongoose');


var internSchema = new mongoose.Schema({
    
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
    collegeName : {
        type : String,
        required: true
    },
    selectField : {
        type : String,
        enum : ['Information Technology' , 'Computer Science', 'Copmuter Technology' , 'Artificial Intelligence'],
        required : true
    },
    selectYear : {
        type : String,
        enum : ['first year' , 'second year' , ' third year' , 'fourth year'],
        required : true
    },
    domainName : {
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

module.exports = mongoose.model(' Intern' , internSchema)