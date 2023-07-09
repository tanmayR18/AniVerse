const User = require('../models/User')
const Profile = require('../models/Profile')


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
            favSideChar="",
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
        profile.favSideChar = favSideChar;

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