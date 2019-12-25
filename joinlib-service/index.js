const http = require("http")
const app = require("./app")

const PORT = process.env.PORT || 3302
const server = http.createServer(app)

server.listen(PORT, () => console.log("The joinlib service is running on " + PORT))
