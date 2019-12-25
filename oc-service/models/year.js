const mongoose = require("mongoose")

const yearSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    year: { type: String, required: true },
    year_is_open: { type: Boolean, required: true },
})

module.exports = mongoose.model("Year", yearSchema)