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

server.use((req, res, next) => {
	res.locals.loggedIn = req.session.loggedIn
	res.locals.username = req.session.username
	res.locals.message = req.session.message
	res.locals.admin = req.session.admin
	res.locals.userId = req.session.userId
	req.session.message = undefined
	next()
})

const authController = require(`./controllers/authController.js`)
server.use(`/auth`, authController)
const breweryController = require(`./controllers/breweryController.js`)
server.use(`/brewery`, breweryController)
const drinkController = require(`./controllers/drinkController.js`)
server.use(`/drink`, drinkController)


server.get(`/`, (req,res) => {
	res.render(`home.ejs`)
})






server.listen(PORT, () => {
	console.log(`Server running on port, ${PORT}`)
})