const { config } = require("dotenv")

config()
module.exports = async function authenticate(req) {
    return req.headers.auth && req.headers.auth == process.env.SECRET
}