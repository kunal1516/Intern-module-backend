const mongoose = require('mongoose');
const userSchema = require('./userModel');

var internSchema = new mongoose.Schema({
    collegeName : {
        type : String,
        required: true
    },
    slectField : {
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
    
})
const Intern = userSchema.discriminator('Intern', internSchema);
module.exports = Intern