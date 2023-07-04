const mongoose = require('mongoose')


const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
    },
    otp:{
        type:String,
        required: true,
    },
    // THe document will be automatically deleted after 5min of it's creation time
    createdAt:{
        type:Date,
        default: Date.now(),
        expires: 5*60
    }
})




module.exports = mongoose.model("OTP",otpSchema)