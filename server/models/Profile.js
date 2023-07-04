const mongoose = require("mongoose")

const profileSchema = new  mongoose.Schema({
    gender:{
        type:String,
    },
    dateOfBirth:{
        type:String,
    },
    about:{
        type:String,
        maxlength:200
    },
    favGenre:{
        type:String,
    },
    favAnime:{
        type:String,
    },
    favMovie:{
        type:String,
    },
    favMaleChar:{
        type:String,
    },
    favVillan:{
        type:String,
    },
    favFemaleChar:{
        type:String,
    },
    favSideChar:{
        type:String
    }
})

module.exports = mongoose.model("profile",profileSchema)
