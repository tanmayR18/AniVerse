const mongoose = require('mongoose')

const animeSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true,
    },
    description:{
        type: String,
        // required:true
    },
    image:{
        type:String,
        // required:true,
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
    rating:{
        type:Number,
        default:0
    },
    // Since the timestamp is applied to the model there is no need for adding updateAt manually
    // updatedAt:{
    //     type:Date,
    //     default:Date.now()
    // },
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

},
{timestamps:true})

module.exports = mongoose.model("Anime", animeSchema)