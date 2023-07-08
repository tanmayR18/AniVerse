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