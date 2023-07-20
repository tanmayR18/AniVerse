const mongoose = require("mongoose")

const requestedAnimeSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type:String,
    },
})

module.exports = mongoose.model("RequestedAnime", requestedAnimeSchema)