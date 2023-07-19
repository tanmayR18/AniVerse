const User = require('../models/User')
const OTP = require('../models/OTP')
const bcrypt = require('bcrypt')
const Profile = require('../models/Profile')
const jwt = require('jsonwebtoken')
const mailSender = require('../utils/mailSender')
const otpGenerator = require("otp-generator")

//sent otp
exports.sendOTP = async(req, res) => {
    try{
        //fetch the data 
        const {email} = req.body
        console.log(email)

        //validate the data
        const checkUserPresent = await User.findOne({email})
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"User already register"
            })
        }

        //generate otp
        const maxAttempts = 10; // Set a maximum number of attempts
        let attempts = 0; // Initialize the attempts counter

        let otp = otpGenerator.generate(6, { 
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        });

        console.log("Before db Call")
        const result = await OTP.findOne({ otp: otp });
        console.log("after db Call")

        while (result && attempts < maxAttempts) {
        otp = otpGenerator.generate(6, { 
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        });
        result = await OTP.findOne({ otp: otp });
        attempts++;
        }

        if (attempts === maxAttempts) {
        // Handle the case where a unique OTP couldn't be generated within the maximum attempts limit
            return res.status(501).json({
                success:false,
                message:"Maximum attempts reached. Unable to generate a unique OTP."
            })
        } 

        const otpPayload = {email, otp}

        //create an for an otp
        const otpBody = await OTP.create(otpPayload)
        console.log("OTP body", otpBody)

        //return response for successful otp register
        res.status(200).json({
            success:true,
            message:"OTP stored in the DB successfully"
        })

    } catch(error) {
        console.error("Error while storing otp",error)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//Sign up
exports.signup = async(req, res) => {
    try{
        //fetch data
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp,
        } = req.body

        //validate data
        if(!firstName || !lastName || !email || !accountType || !otp || !password || !confirmPassword)
            return res.status(403).json({
                success:false,
                message:"All the field are required"
            })

        // match the passwords 
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and confirm password value doesn't match"
            })
        }

        //check if the user is already present
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User is already register"
            })
        }

        //check the most recent otp for the user's email
        const recentOTP = await OTP.find({email}).sort({createdAt:-1}).limit(1)
        console.log("Recent otp",recentOTP)
        console.log("User otp",otp)
        if (recentOTP.lenght == 0){
            return res.status(400).json({
                success: false,
                message: "OTP not found"
            })
        } else if(recentOTP[0].otp !== otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            })
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password,10)

        //set the approval
        let approved = ""
        accountType === "Admin" ? (approved = true) : (approved = false)

        // Create the profile of the user
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            favGenre: null,
            favAnime: null,
            favMovie: null,
            favMaleChar: null,
            favVillan: null,
            favFemaleChar: null,
            favSideChar: null,
        })

        // Register the user in the DB
        const user = await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            accountType:accountType,
            approved:approved,
            additionalDetails: profileDetails._id,
            image:`https://api.dicebear.com/6.x/initials/svg?seed=${firstName} ${lastName}`
        })

        return res.status(200).json({
            success: true,
            message: "User resgistered successfully",
            user,
        })

    } catch(error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"User cannot be registered. Pleases try again"
        })
    }
}

//Login 
exports.login = async(req, res) => {
    try{
        //fetch the data 
        const {email, password} = req.body

        // validate the data 
        if(!email || !password){
            return res.status(400).json({
                success:false,
                messgae:"All the fields are required"
            })
        }

        // check if the user present 
        
        const user = await User.findOne({email}).populate("additionalDetails")
        
        if(!user){
            console.log("Inside the return response of user not registered")
            return res.status(401).json({
                success:false,
                message: "User is not registered, please signup first"
            })
        }

        //check the passoword from the db and generate jwt token 
        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            }

            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"24h"
            })

            user.token = token
            user.password = undefined

            //create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000 ),
                httpOnly: true,
            }

            res.cookie("token",token,options).status(200).json({
                success: true, 
                message: "Logged in successfully",
                token,
                user
            })
        } else{
            return res.status(401).json({
                success:false,
                message: "Password is incorrect",
            })
        }

    } catch(error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message: "Login failed please try again",
            error:error.message
        })
    }
}

//change password
exports.changePassword = async(req, res) => {
    try{
        //fetch data from the body
        const {email, oldPassword, confirmPassword, newPassword} = req.body

        //validate 
        if(!email || !oldPassword || !confirmPassword || !newPassword){
            return res.status(401).json({
                success:false,
                message:"All the fields are required"
            })
        }

        // compare the new and confirm password
        if(newPassword !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Enter the new and confirm password correctly"
            })
        }

        //compare the new password with existing password in the db
        if(oldPassword !== newPassword){
            return res.status(400).json({
                success:false,
                message:"Invalid Password"
            })
        }

        //hashing the new password
        try{
            const hashedPassword = await bcrypt.hash(newPassword,10)
            const updatedUser = await User.findOneAndUpdate(
                                        {email:email},
                                        {password:hashedPassword},
                                        {new:true}
            )
            
            //send notification to the user for changing of password
            try{
                const emailResponse = await mailSender(
                    updatedUser.email,
                    "Password updated - RateMyAnime",
                    `Password updated succesfully for ${updatedUser.firstName} ${updatedUser.lastName}`
                )

                console.log("Email response for changing password", emailResponse)
            } catch(error){
                //Error while sending messagae
                console.error(error)
                return res.status(500).json({
                    success:false,
                    message:"Failed to send otp for password change "
                })
            }
        } catch(error){
            return res.status(500).json({
                error:error,
                success:false,
                message:"Failed to hash and store the password"
            })
        }

    } catch(error) {
        return res.status(500).json({
            success:false,
            message:"Failed to change the password"
        })
    }
}