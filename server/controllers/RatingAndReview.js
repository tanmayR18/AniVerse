const RatingAndReview = require("../models/RatingAndReview")
const User = require('../models/User')
const Anime = require('../models/Anime')
const { default: mongoose } = require('mongoose')


//Function for creating the rating and review
exports.createRatingAndReview = async(req, res) => {
    try{
        //fetch the data
        const {rating, review, animeId} = req.body
        const userId = req.user.id

        //validate the data
        if(!rating || !review){
            return res.status(401).json({
                success:false,
                message:"Please enter both rating and review"
            })
        }

        //TODO: If the anime that the user is trying to rate do not exit then What?

        //check is the user has already rated the anime
        const alreadyRated = await RatingAndReview.find({
            animeId:animeId,
            userId:userId
        })

        if(alreadyRated){
            return res.status(401).json({
                success:false,
                message:"User already Rated the anime series"
            })
        }
        
        //TO upload the rating and review in the RatingAndReview document
        const ratingAndReviewDetails = await RatingAndReview.create({
            userId:userId,
            rating:rating,
            animeId:animeId
        })

        console.log("Entry in the RatingAndReview document",ratingAndReviewDetails)

        //TO update the rating in the anime document
        const updatedAnimeRatingAndReview = await Anime.findByIdAndUpdate(
                                            animeId,
                                            {
                                                $push:{
                                                    ratingAndReviews:ratingAndReviewDetails._id
                                                }
                                            },
                                            {new:true}
        )

        console.log("Entry updated in the Anime document", updatedAnimeRatingAndReview)

        //To update the rating in the user document
        const updatedUserRatingAndReview = await User.findByIdAndUpdate(
                                            userId,
                                            {
                                                $push:{
                                                    ratingAndReviews:ratingDetails._id
                                                }
                                            },
                                            {new:true}
        )
        console.log("Entry updated in the User doument", updatedUserRatingAndReview)

        return res.status(200).json({
            success:true,
            message:"Rating and Review  added successfully"
        })
    } catch(error) {
        console.log("Error while storing the rating",error)
        return res.status(500).json({
            success:true,
            message:error.message
        })
    }
}

//Function for getting average of the rating of the anime
exports.getAverageRating = async(req, res) => {
    try{
        //get anime id
        const animeId = req.body.animeId
        //calculate average rating
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    animeId: new mongoose.Types.ObjectId(animeId)
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"}
                }
            }
        ])

        //return rating
        if(result.length > 0){
            return res.status(200).json({
                success: true,
                message:"Calulate the average rating of the anime",
                averageRating:result[0].averageRating
            })
            
        }

        //if no rating exist
        return res.status(200).json({
            success:true,
            message:"Average Rating is 0, no rating given till now",
            averageRating:0
        })

    } catch(error){
        console.log("Error while averaging the rating",error)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


