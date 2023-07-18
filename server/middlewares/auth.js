const jwt = require('jsonwebtoken')
require('dotenv')
const User = require('../models/User')

//authentions of users
exports.auth = (req,res,next) => {
    try{

        //fetch data from the body/cookie/ header
        const token = req.cookies.token 
                        || req.body.token
                        || req.header("Authorisation").replace("Bearer ","")

        //if token missing, then return response
        if(!token){
            return res.status(401).json({
                message:"Token is missing",
                status:false,
            })
        }

        //verify the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            console.log("Value from user's token",decode)
            req.user = decode
        } catch(err){
            //verfication issue
            return res.status(401).json({
                sucess:false,
                message:"Token is invalid",
            })
        }
        console.log("Authentication successfully")
        next()
    } catch(error) {
        return res.status(401).json({
            sucess:false,
            message:"Something went wrong while validationg the token"
        })
    }
}


//Authorisation for admin
exports.isAdmin = (req, res, next) => {
    try {
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                sucess:false,
                message: "This is a protected route for Admin only",
            })
        }
    } catch (error) {
        return res.status(500).json({
            sucess:false,
            message:"User role cannot be verified, please try again"
        })
    }
    console.log("Authorization completed for Admin")
    next()
}


//Authorisation for Users
exports.isUser = (req, res, next) => {
    try {
        if(req.user.accountType !== "User"){
            return res.status(401).json({
                sucess:false,
                message: "This is a protected route for Users only",
            })
        }
    } catch (error) {
        return res.status(500).json({
            sucess:false,
            message:"User role cannot be verified, please try again"
        })
    }
    console.log("Authorization completed for User")
    next()
}

