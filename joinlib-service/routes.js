const express = require("express")
const joinlib_router = express.Router()
const auth = require("./middleware/auth")
const Student = require("./models/student")

joinlib_router.get("/all", (req, res, next) => {
    console.log("object")
    Student.find().exec()
        .then(result => res.status(200).json({ all: result }))
        .catch(error => res.status(500).json({ error }))
})

joinlib_router.get("/joined", auth, (req, res, next) => {
    Student.find({ joinedlib: true }).exec()
        .then(result => res.status(200).json({ joined: result }))
        .catch(error => res.status(500).json({ error }))
})

joinlib_router.get("/not-joined", auth, (req, res, next) => {
    Student.find({ joinedlib: false }).exec()
        .then(result => res.status(200).json({ not_joined: result }))
        .catch(error => res.status(500).json({ error }))
})

joinlib_router.post("/joinlib/:mat", auth, (req, res, next) => {
    let mat = req.params.mat
    let { joinlib } = req.body
    Student.updateOne({ mat }, { $set: { joinedlib: joinlib } }).exec()
        .then(result => res.status(200).json({ success: true }))
        .catch(error => res.status(500).json(error))
})

module.exports = joinlib_router