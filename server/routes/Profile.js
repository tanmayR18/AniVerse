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
    getAllUserRatingAndReviews,
} = require("../controllers/Profile")

//fetch the change Password controller from AUth 
const {changePassword} = require("../controllers/Auth")



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

//api for changing the password after login in inside the profile section
router.post("/changePassword",changePassword)

module.exports = router
