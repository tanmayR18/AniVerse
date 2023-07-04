//import the mongoose library 
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        require:true,
        trim:true
    },
    lastName:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true
    },
    password:{
        type:String,
        require:true,
        trim:true
    },
    accountType:{
        type:String,
        require:true,
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
        require:true,
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
        require:true
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


module.exports = mongoose.model("user",userSchema)
