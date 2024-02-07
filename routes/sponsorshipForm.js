const { Router } = require("express");
const { SponsorshipForm } = require("../models/AttendaceRegistrationForm");
const authentication = require("../authentication");

const sponsorshipForm = Router()

sponsorshipForm.post("/", async (req, res, next) => {
    console.log(req.body)
    try {
        const { email, phone } = req.body
        const former = await SponsorshipForm.findOne({
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
        const sponsorRequest = await SponsorshipForm.create(req.body)
        res.status(200).json({ sponsorRequest })
    } catch (error) {
        next(error)
    }
})

sponsorshipForm.delete("/:id", async (req, res, next) => {
    try {
        await SponsorshipForm.findByIdAndDelete(req.params.id)
        res.json({})
    } catch (error) {
        next(error)
    }
})

sponsorshipForm.get("/all", async (req, res, next) => {
    try {
        if (await authentication(req)) {
            const sponsorRequests = await SponsorshipForm.find()
            res.json({ sponsorRequests })
        } else {
            return res.status(400).json({ err: "Unable to authenticate request" })
        }
    } catch (error) {
        next(error)
    }
})

module.exports = sponsorshipForm;