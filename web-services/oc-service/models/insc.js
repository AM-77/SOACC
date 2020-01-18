const mongoose = require("mongoose")

const inscSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    year: { type: mongoose.Schema.Types.ObjectId, ref: "Year", required: true },
    insc_is_open: { type: Boolean, required: true },
})

module.exports = mongoose.model("Insc", inscSchema)