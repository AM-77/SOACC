const http = require("http")
const app = require("./app")

const PORT = process.env.PORT || 3301
const server = http.createServer(app)

server.listen(PORT, () => console.log("The auth service is running on: " + PORT))