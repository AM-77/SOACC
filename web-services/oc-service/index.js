const http = require("http")
const app = require("./app")

const PORT = process.env.PORT || 3303
const server = http.createServer(app)

server.listen(PORT, () => console.log("The oc-service is running on: " + PORT))