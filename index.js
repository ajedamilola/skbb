const express = require("express")
const app = express()
const { config } = require("dotenv")
const cors = require("cors")
const attendanceRegistration = require("./routes/attendanceRegistration")
const connectDatabase = require("./models/database")
const exhibitorsReg = require("./routes/exhibitorRegistration")
const sponsorshipForm = require("./routes/sponsorshipForm")
const volunteerForm = require("./routes/volunteerForm")
const feedbackForm = require("./routes/feedbackForm")
const fileUpload = require("express-fileupload")
config()

app.use(fileUpload())
app.use(express.json({ extended: false }))
app.use("/attendee", attendanceRegistration)
app.use("/exhibitor", exhibitorsReg)
app.use("/sponsorship", sponsorshipForm)
app.use("/volunteer", volunteerForm)
app.use("/feedback", feedbackForm)

app.post("/login", async (req, res) => {
    const users = [
        { email: "info@net-trix.ca", password: "Saskatoon2024@@" },
        { email: "admin@saskblackbusiness.ca", password: "Saskatoon2025@@" },
    ]
    const { email, password } = req.body
    const user = users.some(u => u.email == email && u.password == password)
    if (user) {
        return res.json({ loggedIn: true })
    } else {
        res.json({ err: "Invalid login credentials check and try again" })
    }
})

app.use((error, req, res, next) => {
    console.log(error)
    res.json({ err: "An unknown error occured" })
})

connectDatabase()
const { PORT } = process.env
app.listen(PORT, () => {
    console.log("Server Running successfully on port", PORT)
})