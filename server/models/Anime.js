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
    createdAdminId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    updatedAdminId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    updatedAt:{
        type:Date,
        default:Date.now()
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