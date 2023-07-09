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


// get all review
exports.getAllReview = async(req, res) => {
    try{
        //fetch the data in the descending order
        const allReview = await Review.find({})
                                // .sort({rating:"desc"})
                                // .populate({
                                //     path:"userId",
                                //     select:"firstName lastName image"
                                // })
                                // .populate({
                                //     path:"animeId",
                                //     select:"title"
                                // })
                                // .exec()

        //return the response once the data is fetched
        return res.status(200).json({
            success:true,
            message:"All Review fetched successfully",
            data:allReview
        })
    } catch(error){
        console.log("Error while fetching all the reviews",error)
        return res.status(500).json({
            success:false,
            message: "Unable to get the Reviews"
        })
    }
}