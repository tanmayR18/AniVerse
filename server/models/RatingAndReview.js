const mongoose = require("mongoose")

const ratingAndReviewSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    rating:{
        type:Number,
        required:true
    },
    title:{
        type: String
    },
    review:{
        type:String,
        required:true,
    },
    animeId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Anime"
    },
    animeDbId:{
        type: Number,
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    disLikes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]
},
{timestamps:true})

module.exports = mongoose.model("RatingAndReview",ratingAndReviewSchema)