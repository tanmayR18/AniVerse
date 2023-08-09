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
    review:{
        type:String,
        required:true,
    },
    animeId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Anime"
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]
},
{timestamps:true})

module.exports = mongoose.model("RatingAndReview",ratingAndReviewSchema)