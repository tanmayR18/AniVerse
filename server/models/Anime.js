const mongoose = require('mongoose')

const animeSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true,
    },
    description:{
        type: String,
        required:true
    },
    image:{
        type:String,
        required:true,
    },
    genres:{
        type: String,
        required:true
    },
    animeDbId:{
        type: String,
    },
    myAnimeListId: {
        type:String,
    },
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    rating:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Rating"
        }
    ],

})

module.exports = mongoose.model("Anime", animeSchema)