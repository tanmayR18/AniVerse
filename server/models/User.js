//import the mongoose library 
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    accountType:{
        type:String,
        required:true,
        enum: ["Admin", "User"]
    },
    active:{
        type:Boolean,
        default:true
    },
    approved:{
        type:Boolean,
        default:true
    },
    additionalDetails:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile"
    },
    token:{
        type:String
    },
    resetPasswordExpires:{
        type:Date,
    },
    image:{
        type:String,
        required:true
    },
    ratings:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Rating"
        }
    ],
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Review"
        }
    ]
},
//Add timestamps for when the document is created and last modified
{timestamps:true})


module.exports = mongoose.model("User",userSchema)
