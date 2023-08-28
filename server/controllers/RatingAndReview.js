const RatingAndReview = require("../models/RatingAndReview")
const User = require('../models/User')
const Anime = require('../models/Anime')
const { default: mongoose } = require('mongoose')


//Function for creating the rating and review
exports.createRatingAndReview = async(req, res) => {
    try{
        //fetch the data
        const {rating, review, title} = req.body
        const userId = req.user.id

        console.log("create review me Ye mila he backedn me", rating, title, review, userId)
        

        //validate the data
        if(!rating || !review){
            return res.status(401).json({
                success:false,
                message:"Please enter both rating and review"
            })
        }

        //If the anime is not in the database
        let anime = await Anime.findOne({title})
        if(anime === null){
            anime = await Anime.create({
                title: title,
            })
            console.log("anime inside if", anime)
        }
    

        console.log("CHecking result of whether anime is present",anime)
        

        // //TODO: If the anime that the user is trying to rate do not exit then What?

        // //check is the user has already rated the anime
        const alreadyRated = await RatingAndReview.find({
            animeId:anime._id,
            userId:userId
        })

        console.log("Already existed user", alreadyRated)

        if(alreadyRated.length !== 0){
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
            animeId:anime._id,
            title: title
        })

        const averageRatingResult = await RatingAndReview.aggregate([
            {
                $match:{
                    animeId: new mongoose.Types.ObjectId(anime._id)
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"}
                }
            }
        ])

        console.log("Entry in the RatingAndReview document",ratingAndReviewDetails)

        //TO update the rating in the anime document
        const updatedAnimeRatingAndReview = await Anime.findByIdAndUpdate(
                                            anime._id,
                                            {
                                                $push:{
                                                    ratingAndReviews:ratingAndReviewDetails._id
                                                },
                                                $set:{
                                                    rating:averageRatingResult[0].averageRating
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
            message:"Rating and Review  added successfully",
            data: review
        })
    } catch(error) {
        console.log("Error while storing the rating",error)
        return res.status(500).json({
            success:false,
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

//Function for getting all the reviews of the anime
exports.getAllRatingAndReviewsOfAnime = async(req, res) => {
    try{
        const {title} = req.body
        console.log("Anime title", title)
        const animeReview = await RatingAndReview.find({title:title})
                                    .populate({
                                        path: "userId",
                                        select: "userName accountType image",
                                    })

        res.status(200).json({
            success:true,
            message:" Anime review fetched successfully",
            data: animeReview
        })

    } catch(error){
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
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

//Function for gettig top and reviews of this week
exports.getTop10Review = async (req, res) => {
    try{
        const today = new Date();
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);

        const latestAndLikedReview = await RatingAndReview.aggregate([
        // Match documents from the past 7 days
        {
            $match: {
            createdAt: { $gte: sevenDaysAgo, $lte: today }
            }
        },
        // Add a field with the count of likes
        {
            $addFields: {
            likeCount: { $size: "$likes" }
            }
        },
        // Sort by the likeCount field in descending order
        {
            $sort: {
            likeCount: -1
            }
        },
        // Limit to the top 10 records
        {
            $limit: 10
        },
        // Lookup to directly populate the userId field
        {
            $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "populatedUser"
            }
        },
        // Lookup to populate the animeId field
        {
            $lookup: {
                from: "animes", // Replace with the actual collection name
                localField: "animeId",
                foreignField: "_id",
                as: "populatedAnime"
            }
        }
        ]);

          

        // const latestAndLikedReview = await RatingAndReview.find({
        //     "createdAt": {
        //       "$gte": new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
        //     },
        //     "likes": {
        //       "$ne": []
        //     }
        //   })
        //   .sort({
        //     "likes.length": -1
        //   }).limit(10)
        


        return res.status(200).json({
            success: true,
            message: "Top 10 review fetched successfully",
            data: latestAndLikedReview
        })

    } catch(error){
        console.log("Error while fetching the top 5 reviews",error)
        return res.status(505).json({
            success: false,
            message:"Error while fetching the top 5 reviews",
            error: error.message
        })
    }
}

//Function for adding the like in the comment / reivew
exports.addAndRemoveLike = async (req, res) => {
    try{
        // fetch the ID from the cookie
        console.log("Funtion for adding and removing likes hitted")
        const userId = req.user.id
        const userObjectId = new mongoose.Types.ObjectId(userId)
        const {reviewId} = req.body
        console.log("User ID ", userId)


        const alreadyLiked = await RatingAndReview.find({likes: userObjectId, _id: reviewId})

        console.log(alreadyLiked)

        if(alreadyLiked.length !== 0){
            const unLikedReview = await RatingAndReview.findByIdAndUpdate(reviewId,
                {
                    $pull:{likes:userId}
                },{new:true})
    
                return res.status(200).json({
                success: true,
                message: "Liked removed successfully",
                data: unLikedReview
                })
        } else{
            const likedReview = await RatingAndReview.findByIdAndUpdate(reviewId,
                {
                    $push:{likes:userId}
                },
                {new:true}
            )

            return res.status(200).json({
            success: true,
            message: "Liked Added successfully",
            data: likedReview
            })
        }

        // return res.status(400).json({
        //     message:"Fetched",
        //     data: alreadyLiked
        // })
        
    } catch(error){
        console.log("Error while adding the likes to the review",error)
        return res.status(500).json({
            success: false,
            message: "Error while adding the likes to the review",
            error: error.message
        })
    }
}

//Function for adding the dis like in the comment / reivew
exports.addAndRemoveDisLike = async (req, res) => {
    try{
        // fetch the ID from the cookie
        const userId = req.user.id
        const userObjectId = new mongoose.Types.ObjectId(userId)
        const {reviewId} = req.body
        console.log("User ID ", userId)


        const alreadyDisLiked = await RatingAndReview.find({disLikes: userObjectId, _id: reviewId})

        console.log(alreadyDisLiked)

        if(alreadyDisLiked.length !== 0){
            const unDisLikedReview = await RatingAndReview.findByIdAndUpdate(reviewId,
                {
                    $pull:{likes:userId}
                },{new:true})
    
                return res.status(200).json({
                success: true,
                message: "Liked removed successfully",
                data: unDisLikedReview
                })
        } else{
            const disLikedReview = await RatingAndReview.findByIdAndUpdate(reviewId,
                {
                    $push:{disLikes:userId}
                },
                {new:true}
            )

            return res.status(200).json({
            success: true,
            message: "Liked Added successfully",
            data: disLikedReview
            })
        }

        // return res.status(400).json({
        //     message:"Fetched",
        //     data: alreadyLiked
        // })
        
    } catch(error){
        console.log("Error while adding the likes to the review",error)
        return res.status(500).json({
            success: false,
            message: "Error while adding the likes to the review",
            error: error.message
        })
    }
}