const { Router } = require("express");
const { ExhibitorsRegistration } = require("../models/AttendaceRegistrationForm");
const authentication = require("../authentication");

const exhibitorsReg = Router()

exhibitorsReg.post("/", async (req, res, next) => {
    console.log(req.body)
    try {
        const { email, phone } = req.body
        const former = await ExhibitorsRegistration.findOne({
            $or: [
                { email },
                { phone }
            ]
        })
        if (former) {
            return res.status(400).json({
                err: former.email == email ? "This email is already being used" : "Sorry this phone number has been taken already"
            })
        }
        //send email here
        const exhibitors = await ExhibitorsRegistration.create(req.body)
        res.status(200).json({ exhibitors })
    } catch (error) {
        next(error)
    }
})

exhibitorsReg.get("/all", async (req, res, next) => {
    try {
        if (await authentication(req)) {
            const exhibitors = await ExhibitorsRegistration.find()
            res.json({ exhibitors })
        } else {
            return res.status(400).json({ err: "Unable to authenticate request" })
        }
    } catch (error) {
        next(error)
    }
})

module.exports = exhibitorsReg;