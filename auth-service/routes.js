const mongoose = require("mongoose")
const express = require("express")
const auth_router = express.Router()
const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")

const auth = require("./middleware/auth")
const User = require("./models/user")
const Student = require("./models/student")

auth_router.get("/students", auth, (req, res, next) => {
    Student.find().exec()
        .then(students => { res.status(200).json({ students }) })
        .catch(error => res.status(500).json({ error, message: "there was an error" }))
})

auth_router.get("/student/:mat", auth, (req, res, next) => {
    let mat = req.params.mat
    Student.findOne({ mat }).exec()
        .then(student => { res.status(200).json({ student }) })
        .catch(error => res.status(500).json({ error, message: "there was an error" }))
})

auth_router.get("/", auth, (req, res, next) => {
    let _id = req.verified_token._id
    User.findOne({ _id }).exec()
        .then(user => { res.status(200).json({ user }) })
        .catch(error => res.status(500).json({ error, message: "there was an error" }))
})

auth_router.delete("/student/:mat", auth, (req, res, next) => {
    let mat = req.params.mat
    Student.deleteOne({ mat }).exec()
        .then(result => { res.status(200).json({ result }) })
        .catch(error => res.status(500).json({ error, message: "there was an error" }))
})

auth_router.patch("/student/:mat", auth, (req, res, next) => {
    let mat = req.params.mat
    Student.findOne({ mat }).exec()
        .then(student => {
            let new_student = {}
            new_student.mat = req.body.mat || student.mat
            new_student.email = req.body.email || student.email
            new_student.first_name = req.body.first_name || student.first_name
            new_student.last_name = req.body.last_name || student.last_name
            new_student.birthdate = req.body.birthdate || student.birthdate
            new_student.links = req.body.links || student.links
            new_student.year = req.body.year || student.year
            new_student.dep = req.body.dep || student.dep
            new_student.joinedlib = req.body.joinedlib || student.joinedlib

            Student.updateOne({ mat: req.params.mat }, { $set: new_student }).exec()
                .then(result => res.status(200).json({ updated_id: req.params.id, success: true }))
                .catch(error => res.status(500).json(error))

        })
        .catch(error => res.status(500).json({ error, message: "there was an error" }))
})

auth_router.post("/student", auth, (req, res, next) => {
    let { mat, email, first_name, last_name, birthdate, links, year, dep } = req.body
    Student.find({ email }).exec()
        .then(result => {
            if (result.length > 0) {
                res.status(409).json({ message: "Email allready exists." })
            } else {
                let student = new Student({
                    _id: new mongoose.Types.ObjectId(),
                    email,
                    mat,
                    first_name,
                    last_name,
                    birthdate,
                    links,
                    year,
                    dep
                })
                student.save()
                    .then(result => res.status(201).json({ created: result, success: true }))
                    .catch(error => res.status(500).json({ error }))
            }
        })
        .catch(error => res.status(500).json(error))
})

auth_router.post("/login", (req, res, next) => {
    let { email, password } = req.body
    User.findOne({ email }).exec()
        .then(user => {
            if (user) {
                bcryptjs.compare(String(password), user.password, (error, result) => {
                    if (error || !result) res.status(401).json({ error, message: "Auth Failed." })
                    else {
                        let token = jwt.sign({ _id: user._id }, process.env.JWT_KEY || "15zM4%A2%p7$q5Ye1+A0$k4r", { expiresIn: "5d" })
                        res.status(200).json({ user, message: "Logged In.", token })
                    }
                })
            } else {
                res.status(401).json({ message: "Auth Failed." })
            }
        })
        .catch(error => res.status(500).json({ error, message: "there was an error" }))

})

auth_router.post("/subscribe", (req, res, next) => {
    let { email, password, type } = req.body
    User.find({ email }).exec()
        .then(result => {
            if (result.length > 0) {
                res.status(409).json({ message: "Email allready exists." })
            } else {
                bcryptjs.hash(String(password), 7, (error, hashed) => {
                    if (error) {
                        res.status(500).json({ error })
                    } else {
                        let user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email,
                            password: hashed,
                            type
                        })
                        user.save()
                            .then(result => res.status(201).json({ created: result, success: true }))
                            .catch(error => res.status(500).json({ error }))
                    }
                })
            }
        })
        .catch(error => res.status(500).json(error))
})

module.exports = auth_router
