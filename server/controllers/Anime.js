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


