const mongoose = require("mongoose");

async function connectDatabase() {
    try {
        await mongoose.connect(process.env.MONGOURL)
        console.log("Database connected successfully")
    } catch (error) {
        console.log(error)
        console.log("Unable to connect to database.... retrying")
        connectDatabase()
    }
}

module.exports = connectDatabase