const Rating = require('../models/Rating')
const User = require('../models/User')
const Anime = require('../models/Anime')
const { default: mongoose } = require('mongoose')


// create rating
exports.createRating = async(req, res) => {
    try{
        //fetch the data
        const {rating, animeName, animeId} = req.body
        const userId = req.user.id

        //validate the data
        if(!rating){
            return res.status(401).json({
                success:false,
                message:"Please enter the rating"
            })
        }

        //TODO: If the anime that the user is trying to rate do not exit then What?

        //check is the user has already rated the anime
        const alreadyRated = await Rating.find({
            animeId:animeId,
            userId:userId
        })

        if(alreadyRated){
            return res.status(401).json({
                success:false,
                message:"User already Rated the anime series"
            })
        }
        
        //TO upload the rating in the rating document
        const ratingDetails = await Rating.create({
            userId:userId,
            rating:rating,
            animeId:animeId
        })

        console.log("Entry in the rating document",ratingDetails)

        //TO update the rating in the anime document
        const updatedAnimeRating = await Anime.findByIdAndUpdate(
                                            animeId,
                                            {
                                                $push:{
                                                    ratings:ratingDetails._id
                                                }
                                            },
                                            {new:true}
        )

        console.log("Entry updated in the Anime document", updatedAnimeRating)

        //To update the rating in the user document
        const updatedUserRating = await User.findByIdAndUpdate(
                                            userId,
                                            {
                                                $push:{
                                                    ratings:ratingDetails._id
                                                }
                                            },
                                            {new:true}
        )
        console.log("Entry updated in the User doument", updatedUserRating)

        return res.status(200).json({
            success:true,
            message:"Rating added successfully"
        })
    } catch(error) {
        console.log("Error while storing the rating",error)
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