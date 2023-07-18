const Anime = require('../models/Anime')
const ratingAndReview = require("../models/RatingAndReview")


//create an Anime post
exports.createAnimePost = async(req, res) => {
    try{
        //fetch data
        const {
            title,
            description,
            image,
            genres = "",
            animeDbId = "",
            myAnimeListId = "",
            //ratingAndReviews = "",
        } = req.body

        const adminId = req.user.id


        //validate the data
        if(!title || !description || !image){
            return res.status(404).json({
                success:false,
                message:"Please enter title, description and image url"
            })
        }

        //check if anime post already exits
        const existedAnime = await Anime.findOne({title})
        if(existedAnime){
            return res.status(401).json({
                success:false,
                message:"Anime already exist",
                anime: existedAnime
            })
        }

        //create an entry in the ANime document DB
        const animePost = await Anime.create({
            title:title,
            description:description,
            image:image,
            genres:genres,
            animeDbId:animeDbId,
            myAnimeListId:myAnimeListId,
            createdAdminId:adminId,
            ratingAndReviews:null
        })

        //Return the response
        if(animePost){
            return res.status(200).json({
                success:true,
                message:"Anime post created successfully",
                animePost:animePost
            })
        }
        
    } catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Failed to create the anime post"
        })
    }
}


//Get all rated anime post
exports.getAllRatedAnime = async(req, res) => {
    try{
        const animeDetails = await Anime.find({})
                                    .populate("ratingAndReview")
                                    .populate("createdAdminId")
                                    .populate("updatedAdminId")
                                    .exec()
        
        return res.status(200).json({
            success:true,
            message:"All the rated anime fetched successfully",
            data: animeDetails
        })
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Failed to fetch all the rated anime"
        })
    }
}

//Get Anime Details
exports.getRatedAnime = async(req, res) => {
    try{
        //fetch the data
        const {animeId} = req.body

        //validate 
        if(!title){
            return res.status(404).json({
                success:false,
                message:"Enter the anime name"
            })
        }

        //search the anime in the db
        const animeDetail = await Anime.findById(animeId)
                                        .populate("ratingAndReview")
                                        .populate("createdAdminId")
                                        .populate("updatedAdminId")
                                        .exec()

        if(!animeDetail){
            return res.status(200).json({
                success:true,
                message:"Specified anime not found",
                data: false
            })
        }

        //send the response to the user
        return res.status(200).json({
            success:true,
            message:"Fetched the anime Details successfully",
            data: animeDetail
        })
        
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            success:true,
            message:"Unable to fetch the data from db",
            data:false,
        })
    }
}

//update anime post
exports.updateAnimePost = async(req, res) => {
    try{
        //fetch data
        const {
            animeId,
            title,
            description,
            image,
            genres = "",
            animeDbId = "",
            myAnimeListId = "",
            ratingAndReviews = "",
        } = req.body

        const adminId = req.user.id

        //check is the anime present
        const animeDetail = await Anime.findById(animeId)

        if(!animeDetail){
            return res.status(404).json({
                success: false,
                message:"Anime post not found"
            })
        }

        //update the anime post
        const updatedAnimePost = await Anime.findByIdAndUpdate(
                                            animeId,
                                            {
                                                title:title,
                                                description:description,
                                                image:image,
                                                genres:genres,
                                                animeDbId:animeDbId,
                                                myAnimeListId:myAnimeListId,
                                                updatedAdminId:adminId,
                                                ratingAndReviews:ratingAndReviews
                                            },
                                            {new:true}
                                )

        //send response
        return res.status(200).json({
            success:true,
            message: "Anime post updated successfully",
            data: updatedAnimePost
        })

    } catch(error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Unable to update the anime post",
        })
    }
}


//Delete anime post
exports.deleteAnimePost = async(req, res) => {
    try{
        //fetch the data
        const {animeID} = req.body
        const adminId = req.user.id

        //check if the anime Post existed
        const animeDetail = await Anime.findById(animeID)

        if(!animeDetail){
            return res.status(404).json({
                success:false,
                message:"Anime post not found"
            })
        }

        //DB call for deleting the anime
        const deletedAnime = await Anime.findByIdAndDelete(animeID)

        //send response after deleting
        if(deletedAnime){
            return res.status(200).json({
                success:true,
                message:"Anime post delete successfully"
            })
        }
        
    } catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message:"Failed to deleted anime post"
        })
    }
}
