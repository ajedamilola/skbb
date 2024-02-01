const express = require("express")
const app = express()
const { config } = require("dotenv")
const cors = require("cors")
const attendanceRegistration = require("./routes/attendanceRegistration")
const connectDatabase = require("./models/database")
const exhibitorsReg = require("./routes/exhibitorRegistration")
const sponsorshipForm = require("./routes/sponsorshipForm")
const volunteerForm = require("./routes/volunteerForm")
const bodyp = require("body-parser")
const bodyParser = require("body-parser")
config()

// app.use(express.urlencoded({ extended: true }))
app.use(bodyParser({ extended: false }))

app.use("/attendee", attendanceRegistration)
app.use("/exhibitor", exhibitorsReg)
app.use("/sponsorship", sponsorshipForm)
app.use("/volunteer", volunteerForm)

app.use((error, req, res, next) => {
    console.log(error)
    res.json({ err: "An unknown error occured" })
})

connectDatabase()
const { PORT } = process.env
app.listen(PORT, () => {
    console.log("Server Running successfully on port", PORT)
})