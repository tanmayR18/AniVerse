const User = require('../models/User')
const OTP = require('../models/OTP')



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

        const result = await OTP.findOne({ otp: otp });

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