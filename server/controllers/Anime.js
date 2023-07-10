const Anime = require('../models/Anime')


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
            ratingAndReviews = "",
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
            adminId:adminId,
            ratingAndReviews:ratingAndReviews
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
exports.getAnimeRatedAnime = async(req, res) => {
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
        const animeDetail = await Anime.find({title})

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

//Delete anime post


