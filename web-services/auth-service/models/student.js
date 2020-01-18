const mongoose = require("mongoose")

const studentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    mat: { type: String, required: true },
    email: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    birthdate: { type: String, required: true },
    links: { type: Object },
    year: { type: String, required: true },
    dep: { type: String, required: true },
    joinedlib: { type: Boolean, default: false }
})

module.exports = mongoose.model("Student", studentSchema)