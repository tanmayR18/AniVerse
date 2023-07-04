const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    review:{
        type:String,
        required:true,
    },
    animeId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Anime"
    }
})

module.exports = mongoose.model("Review",reviewSchema)