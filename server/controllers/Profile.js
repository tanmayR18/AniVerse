const User = require('../models/User')
const Profile = require('../models/Profile')
const {uploadImageToCloudinary} = require("../utils/imageUploader")


//function for updating the users profile
exports.updatedProfile = async(req, res) => {
    try{    
        const {
            gender="",
            dateOfBirth="",
            about="",
            favGenre="",
            favAnime="",
            favMovie="",
            favMaleChar="",
            favVillan="",
            favFemaleChar="",
        } = req.body

        const id = req.user.id

        //Find the profile by id
        const userDetails = await User.findById(id)
        const profile = await Profile.findById(userDetails.additionalDetails)

        //update the profile fields
        profile.gender = gender;
        profile.dateOfBirth = dateOfBirth;
        profile.about = about;
        profile.favGenre = favGenre;
        profile.favAnime = favAnime;
        profile.favMovie = favMovie;
        profile.favMaleChar = favMaleChar;
        profile.favVillan = favVillan;
        profile.favFemaleChar = favFemaleChar;

        //save the updated profile
        await profile.save()

        //return response
        return res.json({
			success: true,
			message: "Profile updated successfully",
			profile,
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
        const displayPicture = req.files.displayPicture
        const userId = req.user.id

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