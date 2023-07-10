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
    },
    animeDbId:{
        type: String,
    },
    myAnimeListId: {
        type:String,
    },
    adminId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    ratingAndReviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReview"
        }
    ]
    // reviews:[
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Review"
    //     }
    // ],
    // ratings:[
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Rating"
    //     }
    // ],

})

module.exports = mongoose.model("Anime", animeSchema)