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
    deleteAnimePost
} = require("../controllers/Anime")




//Routers
//All the routers can be access by admin only

//api for creating an Anime post
router.post("/createAnimePost",auth,isAdmin,createAnimePost)

//api for getting all the rated anime details
router.get("/getAllRatedAnime",auth,isAdmin,getAllRatedAnime)

//api for getting a single anime details
router.post("/getRatedAnime",auth,isAdmin,getRatedAnime)

//api for updating anime posts
router.put("/updateAnimePost",auth,isAdmin,updateAnimePost)

//api for deleting anime post
router.put("/deleteAnimePost",auth,isAdmin,deleteAnimePost)


module.exports = router