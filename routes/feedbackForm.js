const { Router } = require("express");
const { Feedback } = require("../models/AttendaceRegistrationForm");

const feedbackForm = Router()

feedbackForm.get("/all", async (req, res, next) => {
    try {
        const feedbacks = await Feedback.find()
        res.json({ feedbacks })
    } catch (error) {
        next(error)
    }
})

feedbackForm.post("/", async (req, res, next) => {
    try {
        const feedback = new Feedback({data:req.body})
        feedback.save()
        res.json({ feedback })
    } catch (error) {
        next(error)
    }
})

feedbackForm.delete("/:id", async (req,res,next)=>{
    try {
        await Feedback.findByIdAndDelete(req.params.id)
        res.json({})
    } catch (error) {
        next(next)
    }
})

module.exports = feedbackForm