const mongoose = require("mongoose")

const studentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    mat: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    first_name: { type: String },
    last_name: { type: String },
    birthdate: { type: Date },
    links: { type: Array },
    year: { type: String },
    dep: { type: String },
    joinedlib: { type: Boolean, default: false }
})

module.exports = mongoose.model("Student", studentSchema)