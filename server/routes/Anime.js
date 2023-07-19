const express = require("express")
const router = express.Router()

//Fetch all the middlewares
const {
    auth,
    isAdmin,
    isUser
} = require("../middlewares/auth")


//fetch all the Anime controllers 
const {
    createAnimePost,
    getAllRatedAnime,
    getRatedAnime,
    updateAnimePost,
    deleteAnimePost,
    getLatestAnime,
} = require("../controllers/Anime")


//fetch all the rating and review controller
const {
    createRatingAndReview,
    getAllRatingAndReviews,
    getAverageRating,
    deleteRatingAndReview,
    updateRatingAndReview,
    getLatestRatingAndReview
} = require("../controllers/RatingAndReview")




//Routers

//***************************************************************//
//                     Anime Routes
//***************************************************************//

//api for creating an Anime post
router.post("/createAnimePost",auth,isAdmin,createAnimePost)

//api for getting all the rated anime details
router.get("/getAllRatedAnime",getAllRatedAnime)

//api for getting a single anime details
router.post("/getRatedAnime",getRatedAnime)

//api for updating anime posts
router.put("/updateAnimePost",auth,isAdmin,updateAnimePost)

//api for deleting anime post
router.delete("/deleteAnimePost",auth,isAdmin,deleteAnimePost)

//api for getting 5 latest anime post
router.get("/getLatestAnime",getLatestAnime)


//***************************************************************//
//                     RatingAndReview Routes
//***************************************************************//

//api for creating rating and review
router.post("/createRatingAndReview",auth,isUser,createRatingAndReview)

//api for getting average rating of the anime
router.get("/getAllRatingAndReviews",getAllRatingAndReviews)

//api for getting all the details of the anime
router.post("/getAverageRating",getAverageRating)

//api for deleting rating and review of the anime
router.delete("/deleteRatingAndReview",auth,deleteRatingAndReview)

//api for Updating rating and review of the anime
router.put("/updateRatingAndReview",auth,updateRatingAndReview)

//api for getting top 10 latest rating and review
router.get("/getLatestRatingAndReview",getLatestRatingAndReview)

module.exports = router