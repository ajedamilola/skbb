const { Router } = require("express");
const { AttendanceRegistration } = require("../models/AttendaceRegistrationForm");
const authentication = require("../authentication");
const fs = require("fs");
const path = require("path");

const attendanceRegistration = Router()

attendanceRegistration.post("/", async (req, res, next) => {
    console.log({ body: req.body })
    try {
        const { email, phone } = req.body
        const former = await AttendanceRegistration.findOne({
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
        const attendee = await AttendanceRegistration.create(req.body)
        if (req.files && req.files.studentID) {
            const studentId = req.files.studentID
            const extension = studentId.name.substring(studentId.name.lastIndexOf(".") + 1);
            attendee.studentIdExtension = extension;
            await attendee.save()
            studentId.mv(`./static/student_ids/${attendee.id}.${extension}`)
        }
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
            return res.json({ err: "Unable to authenticate request" })
        }
    } catch (error) {
        next(error)
    }
})

attendanceRegistration.get("/student-id/:id", async (req, res, next) => {
    try {
        const attendee = await AttendanceRegistration.findById(req.params.id)
        if (!attendee) {
            return res.json({ err: "Attendee not found" })
        }
        const dir = path.resolve(`static/student_ids/${req.params.id}.${attendee.studentIdExtension}`)
        if (fs.existsSync(dir)) {
            return res.sendFile(dir)
        } else {
            res.send("File not found")
        }
    } catch (error) {
        next(error)
    }
})

module.exports = attendanceRegistration;