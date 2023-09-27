const User = require('../models/User')
const Profile = require('../models/Profile')
const RatingAndReview = require("../models/RatingAndReview")
const {uploadImageToCloudinary} = require("../utils/imageUploader")
const jwt = require("jsonwebtoken")
require("dotenv").config()


//function for updating the users profile
exports.updatedProfile = async(req, res) => {
    try{    
        const {
            gender=null,
            dateOfBirth= null,
            about= null,
            favGenre= null,
            favAnime= null,
            favMovie= null,
            favMaleChar= null,
            favVillan= null,
            favFemaleChar= null,
            userName=null,
        } = req.body

        const id = req.user.id

        //Find the profile by id
        const userDetails = await User.findById(id)
        const profile = await Profile.findById(userDetails.additionalDetails)

        //update the profile fields
        gender ? profile.gender = gender : profile.gender = profile.gender;
        dateOfBirth ? profile.dateOfBirth = dateOfBirth : profile.dateOfBirth = profile.dateOfBirth ;
        about ? profile.about = about : profile.about = profile.about 
        favGenre ? profile.favGenre = favGenre : profile.favGenre = profile.favGenre
        favAnime ? profile.favAnime = favAnime : profile.favAnime = profile.favAnime 
        favMovie ? profile.favMovie = favMovie : profile.favMovie = profile.favMovie 
        favMaleChar ? profile.favMaleChar = favMaleChar : profile.favMaleChar = profile.favMaleChar 
        favVillan ? profile.favVillan = favVillan : profile.favVillan = profile.favVillan 
        favFemaleChar ? profile.favFemaleChar = favFemaleChar : profile.favFemaleChar = profile.favFemaleChar 


        //save the updated profile
        await profile.save()

        // console.log("Username details in Profile controller", userName, await User.find({userName:userName})).lenght,

        //update the userName
        if(userName && (await User.find({userName:userName})).length !== 0){
            return res.status(401).json({
                success: false,
                message: "User Name already exist"
            })
        }

        
        const updatedUser = userName ? await User.findByIdAndUpdate(id,{userName:userName},{new:true}).populate("additionalDetails") :
                                        await User.findById(id).populate("additionalDetails")

        updatedUser.password = undefined
        
        //token creation

        const payload = {
            email: updatedUser.email,
            id: updatedUser._id,
            accountType: updatedUser.accountType
        }

        console.log("Secret of private key", process.env.JWTSECRET)

        const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"24h"})

        //return response
        return res.json({
			success: true,
			message: "Profile updated successfully",
			user: updatedUser,
            token
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
    }
}

//function for deleting the account
exports.deleteAccount = async(req,res) => {
    try{
        const id = req.user.id
        const user = await User.findById(id)
        if(!user){
            return res.status(404).json({
                success:false,
                message: "User not found"
            })
        }
        //delete assosiate profile with the user
        await Profile.findByIdAndDelete(user.additionalDetails)

        //Remove the review if from the anime 
        const deletedReviews = await RatingAndReview.deleteMany({userId: id})
        console.log("Deleted Reviews", deletedReviews)

        //Think whether we should delete the rating and review of the deleted users or not?
        await User.findByIdAndDelete(id)
        res.status(200).json({
            success:true,
            message:"User deleted successfully"
        })  
    } catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Unable to Delete the user please try later"
        })
    }
}

//Funtion for getting the user details
exports.getAllUserDetails = async(req, res) => {
    try{
        const id = req.user.id
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        console.log(userDetails)
        return res.status(200).json({
            sucess: true,
            message:"User data fetched successfully",
            data:userDetails
        })
    } catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//Function for updating profile picture
exports.updateDisplayPicture = async(req, res) => {
    try{
        console.log("Inside disppay pircture",req.body)
        console.log(req.files)
        const displayPicture = req.files.displayPicture || req.body.displayPicture
        const userId = req.user.id

        if(displayPicture.length === 0){
            console.log("Ye image mele he",displayPicture)
            return res.status(404).json({
                success : false ,
                message :"Please upload a valid file"
            })
        }

        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        console.log(image)
        const updatedProfile = await User.findByIdAndUpdate(
            userId,
            {image: image.secure_url},
            {new:true}
        )

        return res.status(200).json({
            success: true,
            message: "Image Updated Successfully",
            data:updatedProfile
        })
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error will updating the profile picture",
            error:error.message
        })
    }
}

//Get all users ratings
exports.getAllUserRatingAndReviews = async(req, res) => {
    try{
        const id = req.user.id;
        const user = await User.findById(id,{ratingAndReviews:true, firstName:true, lastName:true, email:true}).populate("ratingAndReviews").exec()
        if(!user){
            return res.status(400).json({
                success: false,
                message: `Couldn't find rating data of ${user.firstName} ${user.firstName}`
            })
        }
        return res.status(200).json({
            success:true,
            message:"Rating and review fetched successfully",
            data:user
        })
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            success: true,
            message:"Error while getting the users ratings",
            error:error.message
        })
    }
}

//Get all users reviews
// exports.getAllUserReviews = async(req, res) => {
//     try{
//         const id = req.user.id;
//         const user = await User.findById(id).populate("reviews").exec()
//         if(!user){
//             return res.status(400).json({
//                 success: false,
//                 message: `Couldn't find rating data of ${user.firstName} ${user.firstName}`
//             })
//         }
//     } catch(error) {
//         console.log(error)
//         return res.status(500).json({
//             success: true,
//             message:"Error while getting the users reviews"
//         })
//     }
// }