const { Router } = require("express");
const { AttendanceRegistration } = require("../models/AttendaceRegistrationForm");
const authentication = require("../authentication");

const attendanceRegistration = Router()

attendanceRegistration.post("/", async (req, res, next) => {
    console.log(req.body)
    try {
        const { email, phone } = req.body
        const former = await AttendanceRegistration.findOne({
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
        const attendee = await AttendanceRegistration.create(req.body)
        res.status(200).json({ attendee })
    } catch (error) {
        next(error)
    }
})

attendanceRegistration.delete("/:id", async (req, res, next) => {
    try {
        await AttendanceRegistration.findByIdAndDelete(req.params.id)
        res.json({})
    } catch (error) {
        next(error)
    }
})

attendanceRegistration.get("/all", async (req, res, next) => {
    try {
        if (await authentication(req)) {
            const attendees = await AttendanceRegistration.find()
            res.json({ attendees })
        } else {
            return res.status(400).json({ err: "Unable to authenticate request" })
        }
    } catch (error) {
        next(error)
    }
})

module.exports = attendanceRegistration;