const express = require("express")
const router = express.Router()

//fetch all the middlewares
const {
    auth,
    isAdmin,
    isUser
} = require("../middlewares/auth")

//fetch all the Profile controllers
const {
    updateDisplayPicture,
    updatedProfile,
    deleteAccount,
    getAllUserDetails,
    getAllUserRating,
    getAllUserReviews,
} = require("../controllers/Profile")



//api for updating the profile
router.post("/updateProfile",auth,updatedProfile)

//api for deleting the account
router.delete("/deleteAccount",auth,deleteAccount)

//api for getting all the user detials
router.post("/getAllUserDetails",auth,getAllUserDetails)

//api for updating the profile picture
router.post("/updateDisplayPicture",auth,updateDisplayPicture)

//api for getting all users rating and review
router.get("/getAllUserRatingAndReviews",auth,getAllUserRatingAndReviews)

module.exports = router
