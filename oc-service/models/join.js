const mongoose = require("mongoose")

const joinSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    year: { type: mongoose.Schema.Types.ObjectId, ref: "Year", required: true },
    join_is_open: { type: Boolean, required: true },
})

module.exports = mongoose.model("Join", joinSchema)