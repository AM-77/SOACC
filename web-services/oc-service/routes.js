const mongoose = require("mongoose")
const express = require("express")
const oc_router = express.Router()

const auth = require("./middleware/auth")

const Year = require("./models/year")
const Insc = require("./models/insc")
const Join = require("./models/join")

oc_router.get("/year/:year", auth, (req, res, next) => {
    let find = {}
    req.params.year ? find.year = req.params.year : new Date().getFullYear()

    if (isNaN(find.year) || find.year < 1990 || find.year > new Date().getFullYear()) {
        res.status(500).json({ message: "Unvalid Year Value." })
    } else {
        Year.findOne(find).exec()
            .then(result => res.status(200).json({ result }))
            .catch(error => res.status(500).json(error))
    }
})

oc_router.post("/year/:year", auth, (req, res, next) => {
    let year = 0
    req.params.year ? year = req.params.year : new Date().getFullYear()

    if (isNaN(year) || year < 1990 || year > new Date().getFullYear()) {
        res.status(500).json({ message: "Unvalid Year Value." })
    } else {
        let { open } = req.body
        if (open !== true && open !== false) {
            res.status(500).json({ message: "Unvalid Open Value." })
        } else {
            Year.find({ year }).exec()
                .then(result => {
                    if (result.length > 0) {
                        let year_id = result[0]._id
                        Year.updateOne({ year: year }, { $set: { year_is_open: open } }).exec()
                            .then(result => {
                                if (open === false) {
                                    Insc.updateOne({ year: year_id }, { $set: { insc_is_open: false } }).exec().then(result => {
                                        Join.updateOne({ year: year_id }, { $set: { join_is_open: false } }).exec().then(result => {
                                            res.status(200).json({ updated_year: year, success: true })
                                        }).catch(error => res.status(500).json(error))
                                    }).catch(error => res.status(500).json(error))

                                } else {
                                    res.status(200).json({ updated_year: year, success: true })
                                }
                            })
                            .catch(error => res.status(500).json(error))
                    } else {

                        let _year = new Year({
                            _id: new mongoose.Types.ObjectId(),
                            year: year,
                            year_is_open: open
                        })

                        _year.save()
                            .then(result => res.status(201).json({ created: result, success: true }))
                            .catch(error => res.status(500).json({ error }))
                    }
                })
                .catch(error => res.status(500).json(error))
        }
    }
})


oc_router.get("/insc/:year", auth, (req, res, next) => {
    let find = {}
    req.params.year ? find.year = req.params.year : new Date().getFullYear()

    if (isNaN(find.year) || find.year < 1990 || find.year > new Date().getFullYear()) {
        res.status(500).json({ message: "Unvalid Year Value." })
    } else {
        Year.find(find).exec()
            .then(result => {
                let year = result[0]._id
                if (year) {
                    Insc.findOne({ year }).populate("year").exec()
                        .then(result => res.status(200).json({ result }))
                        .catch(error => res.status(500).json(error))
                } else {
                    res.status(500).json({ message: "Year Does not exist." })
                }
            })
            .catch(error => res.status(500).json(error))
    }
})

oc_router.post("/insc/:year", auth, (req, res, next) => {
    let year = ""
    req.params.year ? year = req.params.year : new Date().getFullYear()

    if (isNaN(year) || year < 1990 || year > new Date().getFullYear()) {
        res.status(500).json({ message: "Unvalid Year Value." })
    } else {
        let { open } = req.body
        if (open !== true && open !== false) {
            res.status(500).json({ message: "Unvalid Open Value" })
        } else {
            Year.find({ year }).exec()
                .then(result => {
                    if (result.length > 0) {
                        if (result[0].year_is_open) {
                            let year_id = result[0]._id
                            Insc.find({ year: result[0]._id }).exec()
                                .then(result => {
                                    if (result.length > 0) {
                                        Insc.updateOne({ _id: result[0]._id }, { $set: { insc_is_open: open } }).exec()
                                            .then(result => res.status(200).json({ updated_year: year, success: true }))
                                            .catch(error => res.status(500).json(error))
                                    } else {
                                        let _insc = new Insc({
                                            _id: new mongoose.Types.ObjectId(),
                                            year: year_id,
                                            insc_is_open: open
                                        })

                                        _insc.save()
                                            .then(result => res.status(201).json({ created: result, success: true }))
                                            .catch(error => res.status(500).json({ error }))
                                    }
                                })
                                .catch(error => res.status(500).json(error))

                        } else {
                            res.status(500).json({ message: "The Year Is Closed." })
                        }
                    } else {
                        res.status(500).json({ message: "Year Does Not Exist." })
                    }
                })
                .catch(error => res.status(500).json(error))
        }
    }
})


oc_router.get("/join/:year", auth, (req, res, next) => {
    let find = {}
    req.params.year ? find.year = req.params.year : new Date().getFullYear()

    if (isNaN(find.year) || find.year < 1990 || find.year > new Date().getFullYear()) {
        res.status(500).json({ message: "Unvalid Year Value." })
    } else {
        Year.find(find).exec()
            .then(result => {
                let year = result[0]._id
                if (year) {
                    Join.find({ year }).populate("year").exec()
                        .then(result => res.status(200).json({ result }))
                        .catch(error => res.status(500).json(error))
                } else {
                    res.status(500).json({ message: "Year Does not exist." })
                }
            })
            .catch(error => res.status(500).json(error))
    }
})

oc_router.post("/join/:year", auth, (req, res, next) => {
    let year = ""
    req.params.year ? year = req.params.year : new Date().getFullYear()

    if (isNaN(year) || year < 1990 || year > new Date().getFullYear()) {
        res.status(500).json({ message: "Unvalid Year Value." })
    } else {
        let { open } = req.body
        if (open !== true && open !== false) {
            res.status(500).json({ message: "Unvalid Open Value" })
        } else {
            Year.find({ year }).exec()
                .then(result => {
                    if (result.length > 0) {
                        if (result[0].year_is_open) {
                            let year_id = result[0]._id
                            Join.find({ year: result[0]._id }).exec()
                                .then(result => {
                                    if (result.length > 0) {
                                        Join.updateOne({ _id: result[0]._id }, { $set: { join_is_open: open } }).exec()
                                            .then(result => res.status(200).json({ updated_year: year, success: true }))
                                            .catch(error => res.status(500).json(error))
                                    } else {
                                        let _join = new Join({
                                            _id: new mongoose.Types.ObjectId(),
                                            year: year_id,
                                            join_is_open: open
                                        })

                                        _join.save()
                                            .then(result => res.status(201).json({ created: result, success: true }))
                                            .catch(error => res.status(500).json({ error }))
                                    }
                                })
                                .catch(error => res.status(500).json(error))

                        } else {
                            res.status(200).json({ message: "The Year Is Closed." })
                        }
                    } else {
                        res.status(200).json({ message: "Year Does Not Exist." })
                    }
                })
                .catch(error => res.status(500).json(error))
        }
    }
})

module.exports = oc_router