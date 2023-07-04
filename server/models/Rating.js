const mongoose = require("mongoose")

const ratingSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    rating:{
        type:Number,
        required:true
    },
    animeId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Anime"
    }
})


module.exports = mongoose.model("rating",ratingSchema)