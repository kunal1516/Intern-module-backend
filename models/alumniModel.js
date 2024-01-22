const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require("crypto");

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

alumniSchema.pre('save', async function (next){
    if(!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password, salt)
})
alumniSchema.methods.isPasswordMatched = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

alumniSchema.methods.createPasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(32).toString("hex")
    this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
    this.passwordResetExpires = Date.now() + 30 *60 * 1000  //10 mins
    return resetToken
}


module.exports = mongoose.model('Alumni', alumniSchema);