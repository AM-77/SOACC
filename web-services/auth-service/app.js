const app = require("express")()
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const DB_HOST = process.env.DB_HOST || "localhost"
const DB_PORT = process.env.DB_PORT || 27017
const DB_NAME = process.env.DB_NAME || "aoscc"

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, { useUnifiedTopology: true, useNewUrlParser: true })

app.use(cors())
app.use(bodyParser.json())

const auth_router = require("./routes")
app.use("/auth-service", auth_router)


app.use((req, res, next) => {
    let error = new Error("Not Found")
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
        .json({
            error: {
                message: error.message,
                method: req.method,
                url: req.url
            }
        })
})

module.exports = app