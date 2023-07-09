const Review = require('../models/Review')
const User = require('../models/User')
const Anime = require('../models/Anime')
const { default: mongoose } = require('mongoose')


// create rating
exports.createReview = async(req, res) => {
    try{
        //fetch the data
        const {review, animeName, animeId} = req.body
        const userId = req.user.id

        //validate the data
        if(!review){
            return res.status(401).json({
                success:false,
                message:"Please enter the review"
            })
        }

        //TODO: If the anime that the user is trying to review do not exit then What?

        //check is the user has already rated the anime
        const alreadyReviewed = await Review.find({
            animeId:animeId,
            userId:userId
        })

        if(alreadyReviewed){
            return res.status(401).json({
                success:false,
                message:"User already Reviewed the anime series"
            })
        }
        
        //TO upload the rating in the review document
        const reviewDetails = await Review.create({
            userId:userId,
            review:review,
            animeId:animeId
        })

        console.log("Entry in the review document",reviewDetails)

        //TO update the rating in the anime document
        const updatedAnimeReview = await Anime.findByIdAndUpdate(
                                            animeId,
                                            {
                                                $push:{
                                                    review:reviewDetails._id
                                                }
                                            },
                                            {new:true}
        )

        console.log("Entry updated in the Anime document", updatedAnimeReview)

        //To update the review in the user document
        const updatedUserReview = await User.findByIdAndUpdate(
                                            userId,
                                            {
                                                $push:{
                                                    review:reviewDetails._id
                                                }
                                            },
                                            {new:true}
        )
        console.log("Entry updated in the User doument", updatedUserReview)

        return res.status(200).json({
            success:true,
            message:"Review added successfully"
        })
    } catch(error) {
        console.log("Error while storing the review",error)
        return res.status(500).json({
            success:true,
            message:error.message
        })
    }
}

// get all average rating
exports.getAverageRating = async(req, res) => {
    try{
        //get anime id
        const animeId = req.body.animeId
        //calculate average rating
        const result = await Rating.aggregate([
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

// get all rating
exports.getAllRating = async(req, res) => {
    try{
        //fetch the data in the descending order
        const allRating = await Rating.find({})
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
            data:allRating
        })
    } catch(error){
        console.log("Error while fetching all the rating",error)
        return res.status(500).json({
            success:false,
            message: "Unable to get the rating"
        })
    }
}