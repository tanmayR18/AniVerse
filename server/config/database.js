const mongoose = require("mongoose")
require("dotenv").config()

exports.connect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then( () => {
        console.log("DB Connected Successfully")
    })
    .catch( (error) => {
        console.log("Failed to connect to DB")
        console.error(error)
        process.exit(1);
    })
}
