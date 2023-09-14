const mongoose = require('mongoose')
const mailSender = require('../utils/mailSender')


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
        expires: 5*60*1000
    }
})


//function to send email
async function sendVerificationEmail(email, otp){
    try{
        const mailResponse = await mailSender(
            email,
            "Verification email from RateMyAnime",
            `Here is you one time password for verification ${otp}`
        )
    } catch(error){
        console.log("Error occured while sending mail")
        throw error
    }
}


otpSchema.pre("save", async function(next){
    //Only send an email when a new website is created
    console.log("Inside pre")
    if(this.isNew){
        await sendVerificationEmail(this.email,this.otp)
    }
    console.log("Before this")
    next()
})


module.exports = mongoose.model("OTP",otpSchema)