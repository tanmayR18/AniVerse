const Anime = require('../models/Anime')
const ratingAndReview = require("../models/RatingAndReview")
const RequestedAnime = require("../models/RequestedAnime")
const User = require('../models/User')
const { uploadImageToCloudinary } = require('../utils/imageUploader')
const mailSender = require('../utils/mailSender')

require("dotenv").config()


//create an Anime post
exports.createAnimePost = async(req, res) => {
    try{
        //fetch data
        const {
            title,
            description,
            // image,
            genres = "",
            animeDbId = "",
            myAnimeListId = "",
            //ratingAndReviews = "",
        } = req.body

        const image = req.files.imageFile

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


        //Upload Anime post image to cloudinary
        const animePostImage = await uploadImageToCloudinary(
            image,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        
        console.log("Image uploaded to cloudinary", animePostImage)

        //create an entry in the ANime document DB
        const animePost = await Anime.create({
            title:title,
            description:description,
            image:animePostImage.secure_url,
            genres:genres,
            animeDbId:animeDbId,
            myAnimeListId:myAnimeListId,
            createdAdminId:adminId,
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
            message:"Failed to create the anime post",
            error:error.message
        })
    }
}


//Get all rated anime post
exports.getAllRatedAnime = async(req, res) => {
    try{
        const animeDetails = await Anime.find({})
                                    // .populate("ratingAndReview")
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
        const {title} = req.body

        //validate 
        if(!title){
            return res.status(404).json({
                success:false,
                message:"Enter the anime name"
            })
        }

        //search the anime in the db
        //If there is no rating and review the populate function gives an error
        const animeDetail = await Anime.find({title:title})
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
            error:error.message,
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
            title="",
            description="",
            // image,
            genres="",
            animeDbId,
            myAnimeListId,
        } = req.body

        const adminId = req.user.id

        const image = req.files?.imageFile || null
        

        //check is the anime present
        const animeDetail = await Anime.findById(animeId)

        if(!animeDetail){
            return res.status(404).json({
                success: false,
                message:"Anime post not found"
            })
        }

        let animePostImage = ""

        //updloading image to cloudinary
        image !== null ? (
            animePostImage = await uploadImageToCloudinary(
                image,
                process.env.FOLDER_NAME,
                1000,
                1000
            )
        ) : (
            animePostImage = ""
        )

        //update the anime post
        const updatedAnimePost = await Anime.findByIdAndUpdate(
                                            animeId,
                                            {
                                                title:title,
                                                description:description,
                                                image:animePostImage.secure_url,
                                                genres:genres,
                                                animeDbId:animeDbId,
                                                myAnimeListId:myAnimeListId,
                                                updatedAdminId:adminId,
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
            error:error.message
        })
    }
}


//Delete anime post
exports.deleteAnimePost = async(req, res) => {
    try{
        //fetch the data
        const {animeId} = req.body
        // const adminId = req.user.id

        //check if the anime Post existed
        const animeDetail = await Anime.findById(animeId)

        if(!animeDetail){
            return res.status(404).json({
                success:false,
                message:"Anime post not found"
            })
        }

        //DB call for deleting the anime
        const deletedAnime = await Anime.findByIdAndDelete(animeId)

        //send response after deleting
        if(deletedAnime){
            return res.status(200).json({
                success:true,
                message:"Anime post delete successfully",
                anime:deletedAnime
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

//Requesting Anime 
exports.requestAnime = async(req, res) => {
    try{

        //fetching of data
        const { title, description } = req.body
        const {id, email} = req.user

        //validation of data
        if(!title){
            return res.status(401).json({
                success:false,
                message:"Enter the title of the Anime"
            })
        }

        //check whether this anime is already exist
        const alreadyExist = await Anime.findOne({title:title})
        if(alreadyExist){
            return res.status(401).json({
                success:false,
                message:"Requested anime already exist",
                data: alreadyExist
            })
        }

        //Check whether the anime is already requested 
        const alreadyRequested = await RequestedAnime.findOne({title:title},{title:true,description:true})
        if(alreadyRequested){
            return res.status(400).json({
                success:false,
                message:"Anime is already requested by you or by other customer",
                data:alreadyRequested
            })
        }

        //Create and entry of the request in the db
        const requestEntry = await RequestedAnime.create({
            userId: id,
            title: title,
            description: description,
            userEmail:email
        })

        const userDetails = await User.findById(id,{firstName:true, lastName:true, email:true})

        await mailSender(
            userDetails.email,
            "Requesting anime post for rating and review",
            `Thank You ${userDetails.firstName} ${userDetails.lastName} for taking concern and contacting us to request the Anime series/movie which is missing. Our admin will add  the series/movie that you are seeking as soon a possible. Once again arigatou :)` 
        )

        return res.status(200).json({
            success: true,
            message: "Request registered successfully",
            data: requestEntry
        })

    } catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Unable to send the request for anime post",
            error:error.messag
        })
    }
}

//Delete the requested Anime
exports.deleteRequestedAnime = async(req, res) => {
    try{

        //fetch the data
        const { requestId, added } = req.body

        //check weather the request Exist
        const requestIdExist = await RequestedAnime.findById(requestId)

        if(!requestIdExist){
            return res.status(404).json({
                success:false,
                message:"Requested Id not found"
            })
        }

        const deleteRequest = await RequestedAnime.findByIdAndDelete(requestId)

        if(added){
            await mailSender(
                requestIdExist.userEmail,
                "Requested anime post added",
                `Dear User the anime post (${requestIdExist.title}) that you requested has been added, you can now give your rating and review`
            )
        }
        
        return res.status(200).json({
            success: true,
            message:"Request deleted succussfully and email sent to the requested user",
            deleteRequest
        })

    } catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Unable to delete the Requested anime",
            error: error.message
        })
    }
}

//Get TOp 5 latest added anime post
exports.getLatestAnime = async(req, res) => {
    try{

        const latestAnimes = await Anime.find({})
                                    .sort({createdAt:-1})
                                    .limit(5)
                                    .exec()

        return res.status(200).json({
            success:true,
            message:"Top 5 latest anime fetched successfully",
            data:latestAnimes
        })

    } catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Unable to fetch top 5 latest Anime",
            error:error.message
        })
    }
}

//Get Top 10 Anime of the week 

// Get Top 10 Anime of the month 

//Get Top 10 Anime of the year

//Get TOp 10 Anime of All times