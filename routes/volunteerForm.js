const { Router } = require("express");
const { VolunteerForm } = require("../models/AttendaceRegistrationForm");
const authentication = require("../authentication");

const volunteerForm = Router()

volunteerForm.post("/", async (req, res, next) => {
    console.log(req+"shirt")
    try {
        const { email, phone } = req.body
        const former = await VolunteerForm.findOne({
            $or: [
                { email },
                { phone }
            ]
        })
        if (former) {
            return res.json({
                err: former.email == email ? "This email is already being used" : "Sorry this phone number has been taken already"
            })
        }
        //send email here
        const volunteer = await VolunteerForm.create(req.body)
        res.status(200).json({ volunteer })
    } catch (error) {
        next(error)
    }
})

volunteerForm.delete("/:id", async (req, res, next) => {
    try {
        await VolunteerForm.findByIdAndDelete(req.params.id)
        res.json({})
    } catch (error) {
        next(error)
    }
})

volunteerForm.get("/all", async (req, res, next) => {
    try {
        if (await authentication(req)) {
            const volunteers = await VolunteerForm.find()
            res.json({ volunteers })
        } else {
            return res.json({ err: "Unable to authenticate request" })
        }
    } catch (error) {
        next(error)
    }
})

module.exports = volunteerForm;