const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        req.verified_token = jwt.verify(token, process.env.JWT_KEY || "15zM4%A2%p7$q5Ye1+A0$k4r")
        next()
    } catch (error) {
        res.status(401).json({ message: "Auth Failed." })
    }
}