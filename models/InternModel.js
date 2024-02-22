const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const crypto = require('crypto')

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
        minlength : 6
    },
    newPassword : {
        type : String,
        minlength : 6
    },
    confirmPassword: {
        type: String,
        //required: true,
        validate: {
            validator: function (value) {
                // Custom validation to check if confirmPassword matches password
                return value === this.password;
            },
            message: 'Passwords do not match',
        }  },
       
})


internSchema.pre('save', async function (next){
    if(!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password, salt)
})
internSchema.methods.isPasswordMatched = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

internSchema.methods.createPasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(32).toString("hex")
    this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
    this.passwordResetExpires = Date.now() + 30 *60 * 1000  //10 mins
    return resetToken
}
module.exports = mongoose.model(' Intern' , internSchema)