const jwt = require('jsonwebtoken')
require('dotenv')
const User = require('../models/User')

//auth 
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
            console.log(decode)
            req.user = decode
            console.log("Inside auth", req.user)
        } catch(err){
            //verfication issue
            return res.status(401).json({
                sucess:false,
                message:"Token is invalid",
            })
        }

        next()
    } catch(error) {
        return res.status(401).json({
            sucess:false,
            message:"Something went wrong while validationg the token"
        })
    }
}