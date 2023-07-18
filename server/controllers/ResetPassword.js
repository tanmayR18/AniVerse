const User = require("../models/User")
const mailSender =  require("../utils/mailSender")
const bcrypt = require("bcrypt")
const crypto = require("crypto")


// generate resent password token
exports.resetPasswordToken = async(req, res) => {
    try{
        //fetch the data from body
        const {email} = req.body
        
        //check is the user present 
        const user = await User.find({email})
        console.log(user)
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Your email is not registered with us"
            })
        }

        //generate token 
        const token = crypto.randomBytes(20).toString("hex")

        //update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate(
                                            {email:email},
                                            {
                                                token:token,
                                                resetPasswordExpires: Date.now() + 600000
                                            },
                                            {new:true}
                                )
        console.log("Updated details",updatedDetails)

        //create Url
        const url = `http://localhost:3000/update-password/${token}`

        //send email
        await mailSender(
            email,
            "Password Reset Link",
            `Password Rest Link: ${url}`
        )

        //return response
        return res.status(200).json({
            success:true,
            message:"Email sent successfully, please check emial and change your password"
        })

    } catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Something went wrong while sending the reset password email"
        })
    }
}

//reset password
exports.resetPassword = async(req, res) => {
    try{
        //fetch the data
        const {password, confirmPassword, token} = req.body

        //validation
        if(password !== confirmPassword) {
            return res.status(401).json({
                success:false,
                message:"Passwords does not match"
            })
        }

        //get the user detials
        const userDetails = await User.find({token:token})

        //if no user existed
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"Token is invalid"
            })
        }

        //check token expire time
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(401).json({
                success:false,
                message:"Token is expired, please regenerate your token"
            })
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password,10)

        //update the password in the db
        const updatedUser = await User.findOneAndUpdate(
                {token:token},
                {password:hashedPassword},
                {new:true}
        )

        //send email 
        const date = new Date(Date.now())
        await mailSender(
            updatedUser.email,
            "Password Updated - RateMyAnime",
            `Your password was updated at ${date.toString().split(" ").splice(0,5).join(" ")} .
            Infrom the Admin or Developer if it wasn't you`
        )

        //return response
        res.status(200).json({
            success:true,
            message:"Password reset successfully"
        })

    } catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while reseting the password",
            error:error.message
        })
    }
}