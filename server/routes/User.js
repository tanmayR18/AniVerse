const express = require("express")
const router = express.Router()

//fetch all the middlewares
const {
    auth,
    isAdmin,
    isUser
} = require("../middlewares/auth")

//fetch all Users controllers
const {
    login,
    signup,
    sendOTP,
    changePassword
} = require("../controllers/Auth")

//fetch all controllers for reset password
const {
    resetPassword,
    resetPasswordToken
} = require("../controllers/ResetPassword")


//***************************************************************//
//                     Authentication Routes
//***************************************************************//

router.post("/login",login)
router.post("/signup",signup)
router.post("/sendotp",sendOTP)
router.post("/changePassword",auth,changePassword)

//***************************************************************//
//                     Reset-Password Routes
//***************************************************************//

router.post("/reset-password-token",resetPasswordToken)
router.post("/reset-password",resetPassword)

module.exports = router