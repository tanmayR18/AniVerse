const express = require("express")
const app = express()

// fetch API 
const userRouter = require("./routes/User")
const profileRouter = require("./routes/Profile")
const animeRouter = require("./routes/Anime")

// database
const database = require("./config/database")

// cloudinary
const {cloudinaryConnect} = require("./config/cloudinary")

// Other packages
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const fileUpload = require("express-fileupload")

dotenv.config()
const PORT = process.env.PORT

//database connect
database.connect();

//middleware
app.use(express.json())
app.use(cookieParser())
//add the cors once frontend started
//See what is the use of fileUpload
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)

//cloudinary connection
cloudinaryConnect();

//define routes
app.use("api/v1/auth",userRouter)
app.use("api/v1/profile",profileRouter)
app.use("api/v1/anime",animeRouter)

app.get("/", (req, res) => {
    res.send("<h1>Yee Buddy Light Weight</h1>")
})

app.listen(PORT, () => {
    console.log(`Your server is running on local host ${PORT}`)
})