const { Schema, model } = require("mongoose");

const schema = new Schema({
    name: String,
    email: String,
    phone: String,
    organization: String,
    city: String,
    hearingMethod: Number,
    regType: Number,
    notes: String,
    date: {
        type: Date,
        default: () => Date.now()
    }
})

const AttendanceRegistration = model("attendanceRegistration", schema)

const exhibitorsSchema = new Schema({
    organization: String,
    name: String,
    email: String,
    phone: String,
    url: String,
    description: String,
    boothSize: Number,
    date: {
        type: Date,
        default: () => Date.now()
    },
    additional: String
})

const ExhibitorsRegistration = model("exhibitorsRegistration", exhibitorsSchema)

const sponsorshipSchema = new Schema({
    organization: String,
    name: String,
    email: String,
    phone: String,
    url: String,
    level: Number,
    specific: String,
    date: {
        type: Date,
        default: () => Date.now()
    },
    additional: String
})

const SponsorshipForm = model("sponsorshipForm", sponsorshipSchema)


const volunteerSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    availability: Number,
    areas: [Number],
    specific: String,
    date: {
        type: Date,
        default: () => Date.now()
    },
})

const VolunteerForm = model("volunteerForm", volunteerSchema)


module.exports = { AttendanceRegistration, ExhibitorsRegistration, SponsorshipForm, VolunteerForm }