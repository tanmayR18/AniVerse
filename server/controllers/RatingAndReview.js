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
        const alreadyRated = await RatingAndReview.findOne({
            animeId:animeId,
            userId:userId
        })

        console.log("Already exited user", alreadyRated)

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
            review:review,
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
                                                    ratingAndReviews:ratingAndReviewDetails._id
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

//Function for getting all the rating and reviews
exports.getAllRatingAndReviews = async(req, res) => {
    try{
        //fetch the data in the descending order
        const allRatingAndReviews = await RatingAndReview.find({})
                                .sort({rating:"desc"})
                                .populate({
                                    path:"userId",
                                    select:"firstName lastName image"
                                })
                                .populate({
                                    path:"animeId",
                                    select:"title"
                                })
                                .exec()

        //return the response once the data is fetched
        return res.status(200).json({
            success:true,
            message:"All Review fetched successfully",
            data:allRatingAndReviews
        })
    } catch(error){
        console.log("Error while fetching all the rating",error)
        return res.status(500).json({
            success:false,
            message: "Unable to get the rating"
        })
    }
}

//Function for deleting the rating nd review
exports.deleteRatingAndReview = async(req, res) => {
    try{    
        //fetch the data
        const {ratingAndReviewId} = req.body
        const userId = req.user.id

        const deletedRatingAndReview = await RatingAndReview.findByIdAndDelete(ratingAndReviewId)
        console.log("Deleted Rating And Review model", deletedRatingAndReview)

        const updatedAnimeRatingAndReview = await Anime.findByIdAndUpdate(
                                                deletedRatingAndReview.animeId,
                                                {
                                                    $pull:{ratingAndReviews:ratingAndReviewId}
                                                },
                                                {new:true}
                                            )

        console.log("Updated anime rating and review", updatedAnimeRatingAndReview)

        const updatedUserRatingAndReview = await User.findByIdAndUpdate(
                                                userId,
                                                {
                                                    $pull:{ratingAndReviews:ratingAndReviewId}
                                                },
                                                {new:true}
                                            ) 

        console.log("Updated User rating and review", updatedUserRatingAndReview)
        
        if(deletedRatingAndReview && updatedAnimeRatingAndReview && updatedUserRatingAndReview){
            return res.status(200).json({
                success:true,
                message:"Rating and review deleted successfully",
                data: deletedRatingAndReview
            })
        } else{
            return res.status(500).json({
                success:false,
                message:"Cannot deleted Rating and review",
            })
        }

    } catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Unable to delete the Rating And Review",
            error:error.message
        })
    }
}

//Function for updating Rating and review
exports.updateRatingAndReview = async(req, res) => {
    try{
        const {ratingAndReviewId, rating, review} = req.body

        const updatedRatingAndReview = await RatingAndReview.findByIdAndUpdate(
                                                    ratingAndReviewId,
                                                    {
                                                        rating:rating,
                                                        review:review
                                                    },
                                                    {new:true}
                                                )

        return res.status(200).json({
            success:true,
            message:"Rating And review updated successfully",
            data:updatedRatingAndReview
        })

    } catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Unable to update the rating and review",
            error:error.message
        })
    }
}

//Function for getting latest 10 rating and reviews
exports.getLatestRatingAndReview = async(req, res) => {
    try{
        const latestRatingAndReview = await RatingAndReview.find({})
                                                        .sort({createdAt:-1})
                                                        .limit(10)
                                                        .exec()
        return res.status(200).json({
            success:true,
            message:"Successfully fetched the latest rating and review",
            data:latestRatingAndReview
        })
        
    } catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Unable to get 10 latest rating and review",
            error:error.message
        })
    }
}