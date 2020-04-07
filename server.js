require(`dotenv`).config()
const express = require(`express`)
const server = express()
const PORT = process.env.PORT
require(`./db/db.js`)
const bodyParser = require(`body-parser`)
const methodOverride = require('method-override')
const session = require(`express-session`)


server.use(express.static(`public`))
server.use(bodyParser.urlencoded({extended:false}))
server.use(methodOverride('_method'))

server.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

const authController = require(`./controllers/authController.js`)
server.use(`/auth`, authController)

server.get(`/`, (req,res) => {
	res.render(`home.ejs`)
})






server.listen(PORT, () => {
	console.log(`Server running on port, ${PORT}`)
})